import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PaymentType, SubscriptionType } from '@prisma/client';
import axios from 'axios';
import crypto from 'crypto';
import CryptoJS from 'crypto-js';
import moment from 'moment';

import { PaymentStatus, SubscriptionStatus } from 'src/common/enum/common';
import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { addMonths } from 'src/common/utils/date';
import {
  MomoCallbackDto,
  PaymentCallbackDto,
  ZaloCallbackDto,
} from 'src/models/subscription/dto/callback.dto';
import {
  CheckPaymentStatusDto,
  CheckPaymentStatusResponseDto,
} from 'src/models/subscription/dto/check-payment-status.dto';
import {
  CreatePaymentDto,
  CreatePaymentResponseDto,
} from 'src/models/subscription/dto/create-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async createPayment(
    provider: PaymentType,
    dto: CreatePaymentDto,
    currentUser: IAuthPayload,
  ): Promise<CreatePaymentResponseDto> {
    // const transactionId = `${provider}_${Date.now()}`;
    const transID = Math.floor(Math.random() * 1000000);
    const transactionId = `${moment().format('YYMMDD')}_${transID}`;
    const userId = String(currentUser.sub);

    // Create pending subscription and payment
    try {
      await this.prisma.$transaction(async (tx) => {
        // Create subscription
        const subscription = await tx.subscription.create({
          data: {
            userId: userId,
            type: dto.planType,
            startDate: new Date(),
            endDate: this.calculateEndDate(dto.planType),
            status: SubscriptionStatus.PENDING,
          },
        });

        // Create payment record
        await tx.subscriptionPayment.create({
          data: {
            subscriptionId: subscription.id,
            amount: dto.amount,
            paymentType: provider,
            paymentDate: new Date(),
            status: PaymentStatus.PENDING,
            transactionId,
            currency: dto.currency || 'VND',
          },
        });
      });

      // Generate payment URL based on provider
      const paymentUrl = await this.generatePaymentUrl(provider, {
        amount: dto.amount,
        transactionId,
        description: `Subscription Payment - ${dto.planType}`,
      });

      return { paymentUrl, transactionId };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to create payment ');
    }
  }

  private calculateEndDate(planType: SubscriptionType): Date {
    const now = new Date();
    switch (planType) {
      case 'BASIC':
        return addMonths(now, 1);
      case 'PREMIUM':
        return addMonths(now, 3);
      default:
        return now;
    }
  }

  private async generatePaymentUrl(
    provider: PaymentType,
    data: {
      amount: number;
      transactionId: string;
      description: string;
    },
  ): Promise<string> {
    if (!(provider in PaymentType)) {
      throw new BadRequestException('Unsupported payment provider');
    }
    switch (provider) {
      case PaymentType.momo:
        return this.generateMomoUrl(data);
      case PaymentType.zalopay:
        return this.generateZaloUrl(data);
      default:
        throw new BadRequestException('Unsupported payment provider');
    }
  }

  private async generateMomoUrl(data: {
    amount: number;
    transactionId: string;
    description: string;
  }): Promise<string> {
    const { amount, transactionId, description } = data;

    // Get config
    const accessKey = this.configService.get<string>('MOMO_ACCESS_KEY');
    const secretKey = this.configService.get<string>('MOMO_SECRET_KEY');
    const partnerCode = this.configService.get<string>('MOMO_PARTNER_CODE');
    const redirectUrl = this.configService.get<string>('MOMO_REDIRECT_URL');

    const ipnUrl = `${this.configService.get('APP_URL')}/api/subscriptions/payment/momo/callback`;

    // Generate signature like your example
    const rawSignature = [
      'accessKey=' + accessKey,
      'amount=' + amount,
      'extraData=',
      'ipnUrl=' + ipnUrl,
      'orderId=' + transactionId,
      'orderInfo=' + description,
      'partnerCode=' + partnerCode,
      'redirectUrl=' + redirectUrl,
      'requestId=' + transactionId,
      'requestType=payWithMethod',
    ].join('&');

    console.log(ipnUrl);

    const signature = crypto
      .createHmac('sha256', secretKey)
      .update(rawSignature)
      .digest('hex');

    // Create request body exactly like your example
    const requestBody = JSON.stringify({
      partnerCode,
      partnerName: 'Test',
      storeId: 'MomoTestStore',
      requestId: transactionId,
      amount,
      orderId: transactionId,
      orderInfo: description,
      redirectUrl,
      ipnUrl,
      lang: 'vi',
      requestType: 'payWithMethod',
      autoCapture: true,
      extraData: '',
      signature,
    });

    try {
      const response = await axios.post(
        'https://test-payment.momo.vn/v2/gateway/api/create',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody),
          },
        },
      );

      return response.data.payUrl;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to generate Momo payment URL',
      );
    }
  }

  private async generateZaloUrl(data: {
    amount: number;
    transactionId: string;
    description: string;
  }): Promise<string> {
    const { amount, transactionId, description } = data;

    // Get config from env
    const config = {
      app_id: this.configService.get<string>('ZALO_APP_ID'),
      key1: this.configService.get<string>('ZALO_KEY1'),
      key2: this.configService.get<string>('ZALO_KEY2'),
      endpoint: 'https://sb-openapi.zalopay.vn/v2/create',
    };

    // Prepare embed data & items like example
    const embed_data = {
      redirecturl: this.configService.get<string>('ZALO_RETURN_URL'),
    };

    const items = []; // Empty array as example

    // Build order data exactly like example
    const order = {
      app_id: config.app_id,
      app_trans_id: transactionId,
      app_user: 'user123',
      app_time: Date.now(),
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount,
      callback_url: `${this.configService.get('APP_URL')}/api/subscriptions/payment/zalopay/callback`,
      description,
      bank_code: '',
    };

    // Calculate mac exactly like example
    const macData =
      config.app_id +
      '|' +
      order.app_trans_id +
      '|' +
      order.app_user +
      '|' +
      order.amount +
      '|' +
      order.app_time +
      '|' +
      order.embed_data +
      '|' +
      order.item;

    order['mac'] = CryptoJS.HmacSHA256(macData, config.key1).toString();

    console.log('ZaloPay Request:', order);

    try {
      const response = await axios.post(config.endpoint, null, {
        params: order,
      });

      console.log('ZaloPay Response:', response.data);

      // Check return code
      if (response.data.return_code === 1) {
        return response.data.order_url;
      }

      throw new Error(
        `${response.data.return_message} (${response.data.sub_return_message || ''})`,
      );
    } catch (error) {
      console.error('ZaloPay Error:', error);
      throw new InternalServerErrorException(
        'Failed to generate ZaloPay payment URL: ' + error.message,
      );
    }
  }

  async handleCallback(
    provider: PaymentType,
    payload: PaymentCallbackDto,
  ): Promise<void> {
    if (!(provider in PaymentType)) {
      throw new BadRequestException('Unsupported payment provider');
    }

    switch (provider) {
      case PaymentType.momo:
        await this.handleMomoCallback(payload);
        break;
      case PaymentType.zalopay:
        await this.handleZaloCallback(payload);
        break;
      default:
        throw new BadRequestException('Unsupported payment provider');
    }
  }

  private async handleMomoCallback(payload: PaymentCallbackDto): Promise<void> {
    const { orderId: transactionId, resultCode } = payload as MomoCallbackDto;
    console.log('Transaction ID:', transactionId);
    console.log('Result Code:', resultCode);

    try {
      if (!transactionId) {
        throw new BadRequestException(
          'Missing transaction ID in payment callback',
        );
      }

      await this.prisma.$transaction(async (tx) => {
        const payment = await tx.subscriptionPayment.findFirst({
          where: { transactionId },
          include: { subscription: true },
        });

        if (!payment) return;

        if (resultCode === 0) {
          // Payment successful
          await tx.subscriptionPayment.update({
            where: { id: payment.id },
            data: { status: PaymentStatus.SUCCESS },
          });

          await tx.subscription.update({
            where: { id: payment.subscriptionId },
            data: { status: SubscriptionStatus.ACTIVE },
          });
        } else {
          // Payment failed
          await tx.subscriptionPayment.update({
            where: { id: payment.id },
            data: { status: PaymentStatus.FAILED },
          });

          await tx.subscription.update({
            where: { id: payment.subscriptionId },
            data: { status: SubscriptionStatus.PAYMENT_FAILED },
          });
        }
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to process payment callback',
      );
    }
  }

  private async handleZaloCallback(payload: PaymentCallbackDto): Promise<void> {
    const { data, type } = payload as ZaloCallbackDto;
    const parseData = JSON.parse(data);
    const transactionId = parseData?.app_trans_id;
    const status = type;

    console.log('Transaction ID:', transactionId);
    console.log('Status:', status);

    try {
      if (!transactionId) {
        throw new BadRequestException(
          'Missing transaction ID in payment callback',
        );
      }

      await this.prisma.$transaction(async (tx) => {
        const payment = await tx.subscriptionPayment.findFirst({
          where: { transactionId },
          include: { subscription: true },
        });

        if (!payment) return;

        if (status === 1) {
          // Payment successful
          await tx.subscriptionPayment.update({
            where: { id: payment.id },
            data: { status: PaymentStatus.SUCCESS },
          });

          await tx.subscription.update({
            where: { id: payment.subscriptionId },
            data: { status: SubscriptionStatus.ACTIVE },
          });
        } else {
          // Payment failed
          await tx.subscriptionPayment.update({
            where: { id: payment.id },
            data: { status: PaymentStatus.FAILED },
          });

          await tx.subscription.update({
            where: { id: payment.subscriptionId },
            data: { status: SubscriptionStatus.PAYMENT_FAILED },
          });
        }
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to process payment callback',
      );
    }
  }

  async checkStatus(
    provider: PaymentType,
    dto: CheckPaymentStatusDto,
  ): Promise<CheckPaymentStatusResponseDto> {
    switch (provider) {
      case PaymentType.momo:
        return this.checkMomoStatus(dto.transactionId);
      case PaymentType.zalopay:
        return this.checkZaloStatus(dto.transactionId);
      default:
        throw new BadRequestException('Unsupported payment provider');
    }
  }

  private async checkMomoStatus(
    transactionId: string,
  ): Promise<CheckPaymentStatusResponseDto> {
    const accessKey = this.configService.get('MOMO_ACCESS_KEY');
    const secretKey = this.configService.get('MOMO_SECRET_KEY');
    const partnerCode = this.configService.get('MOMO_PARTNER_CODE');

    const rawSignature = [
      'accessKey=' + accessKey,
      'orderId=' + transactionId,
      'partnerCode=' + partnerCode,
      'requestId=' + transactionId,
    ].join('&');

    const signature = crypto
      .createHmac('sha256', secretKey)
      .update(rawSignature)
      .digest('hex');

    const requestBody = {
      partnerCode,
      requestId: transactionId,
      orderId: transactionId,
      signature,
      lang: 'vi',
    };

    try {
      const response = await axios.post(
        'https://test-payment.momo.vn/v2/gateway/api/query',
        requestBody,
      );

      return {
        success: response.data.resultCode === 0,
        status: response.data.resultCode === 0 ? 'success' : 'failed',
        message: response.data.message,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to check Momo payment status',
      );
    }
  }

  private async checkZaloStatus(
    transactionId: string,
  ): Promise<CheckPaymentStatusResponseDto> {
    const appId = this.configService.get('ZALO_APP_ID');
    const key1 = this.configService.get('ZALO_KEY1');

    const data = appId + '|' + transactionId + '|' + key1;
    const mac = CryptoJS.HmacSHA256(data, key1).toString();

    const params = {
      app_id: appId,
      app_trans_id: transactionId,
      mac,
    };

    try {
      const response = await axios.post(
        'https://sb-openapi.zalopay.vn/v2/query',
        null,
        { params },
      );
      console.log(response.data);

      return {
        success: response.data.return_code === 1,
        status: response.data.return_code === 1 ? 'success' : 'failed',
        message: response.data.return_message,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to check ZaloPay payment status',
      );
    }
  }
}
