import { Injectable, NotFoundException } from '@nestjs/common';

import {
  paginationQuery,
  searchQuery,
} from 'src/common/helper/prisma-queries.helper';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { calculatePagination } from 'src/common/utils/pagination';
import { SubscriptionPaymentResponse } from 'src/models/subscription-payment/dto/subscription-payment-response.dto';

import { CreateSubscriptionPaymentDto } from './dto/create-subscription-payment.dto';
import { FindAllSubscriptionPaymentDto } from './dto/find-all-subscription-payment.dto';
import { FindOneSubscriptionPaymentResponseDto } from './dto/find-one-subscription-payment-response.dto';
import { UpdateSubscriptionPaymentDto } from './dto/update-subscription-payment.dto';

@Injectable()
export class SubscriptionPaymentService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly includeQuery = {
    subscription: true,
  } as const;

  async create(
    createSubscriptionPaymentDto: CreateSubscriptionPaymentDto,
  ): Promise<FindOneSubscriptionPaymentResponseDto> {
    const subscription = await this.prisma.subscription.findFirst({
      where: { id: createSubscriptionPaymentDto.subscriptionId },
    });

    if (!subscription) {
      throw new NotFoundException(
        `Subscription ${createSubscriptionPaymentDto.subscriptionId} not found`,
      );
    }

    const payment = await this.prisma.subscriptionPayment.create({
      data: createSubscriptionPaymentDto,
      include: this.includeQuery,
    });

    return { payment };
  }

  async findAll(
    query: FindAllSubscriptionPaymentDto,
  ): Promise<SubscriptionPaymentResponse> {
    const { page, perPage, search } = query;

    const where = {
      ...searchQuery(search, ['status']),
    };

    const [payments, totalItems] = await Promise.all([
      this.prisma.subscriptionPayment.findMany({
        where,
        orderBy: { paymentDate: 'desc' },
        ...paginationQuery(page, perPage),
        include: this.includeQuery,
      }),
      this.prisma.subscriptionPayment.count({ where }),
    ]);

    return {
      data: payments,
      pagination: calculatePagination(totalItems, query),
    };
  }

  async findAllHistory(
    userId: string,
    query: FindAllSubscriptionPaymentDto,
  ): Promise<SubscriptionPaymentResponse> {
    const { page, perPage, search } = query;

    const where = {
      subscription: {
        userId,
      },
      ...searchQuery(search, ['status']),
    };

    const [payments, totalItems] = await Promise.all([
      this.prisma.subscriptionPayment.findMany({
        // where,
        orderBy: { paymentDate: 'asc' },
        ...paginationQuery(page, perPage),
        include: this.includeQuery,
      }),
      this.prisma.subscriptionPayment.count({ where }),
    ]);

    return {
      data: payments,
      pagination: calculatePagination(totalItems, query),
    };
  }

  async findOne(id: string): Promise<FindOneSubscriptionPaymentResponseDto> {
    const payment = await this.prisma.subscriptionPayment.findFirst({
      where: { id },
      include: this.includeQuery,
    });

    if (!payment) {
      throw new NotFoundException(`Payment ${id} not found`);
    }

    return { payment };
  }

  async update(
    id: string,
    updateSubscriptionPaymentDto: UpdateSubscriptionPaymentDto,
  ): Promise<FindOneSubscriptionPaymentResponseDto> {
    const payment = await this.prisma.subscriptionPayment.findFirst({
      where: { id },
    });

    if (!payment) {
      throw new NotFoundException(`Payment ${id} not found`);
    }

    const updated = await this.prisma.subscriptionPayment.update({
      where: { id },
      data: updateSubscriptionPaymentDto,
      include: this.includeQuery,
    });

    return { payment: updated };
  }

  async delete(id: string): Promise<FindOneSubscriptionPaymentResponseDto> {
    const payment = await this.prisma.subscriptionPayment.findFirst({
      where: { id },
    });

    if (!payment) {
      throw new NotFoundException(`Payment ${id} not found`);
    }

    const deleted = await this.prisma.subscriptionPayment.delete({
      where: { id },
    });

    return { payment: deleted };
  }
}
