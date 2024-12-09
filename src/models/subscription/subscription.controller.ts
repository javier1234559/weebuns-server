import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PaymentType } from '@prisma/client';

import { AuthGuard } from 'src/common/auth/auth.guard';
import { RolesGuard } from 'src/common/auth/role.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles, UserRole } from 'src/common/decorators/role.decorator';
import { IAuthPayload } from 'src/common/interface/auth-payload.interface';
import { PaymentCallbackDto } from 'src/models/subscription/dto/callback.dto';
import {
  CheckPaymentStatusDto,
  CheckPaymentStatusResponseDto,
} from 'src/models/subscription/dto/check-payment-status.dto';
import { FindSubscriptionStatusResponseDto } from 'src/models/subscription/dto/check-subscription-status.dto';
import {
  CreatePaymentDto,
  CreatePaymentResponseDto,
} from 'src/models/subscription/dto/create-payment.dto';
import { PaymentService } from 'src/models/subscription/payment.service';
import { SubscriptionService } from 'src/models/subscription/subscription.service';

@Controller('subscriptions')
@ApiTags('subscriptions')
export class SubscriptionController {
  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly paymentService: PaymentService,
  ) {}

  @Get('status')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  @ApiResponse({
    status: HttpStatus.OK,
    type: FindSubscriptionStatusResponseDto,
  })
  async getStatus(
    @CurrentUser() currentUser: IAuthPayload,
  ): Promise<FindSubscriptionStatusResponseDto> {
    const userId = String(currentUser.sub);
    return this.subscriptionService.getStatus(userId);
  }

  @Post('payment/:provider')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  @ApiParam({
    name: 'provider',
    enum: PaymentType,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreatePaymentResponseDto,
  })
  async createPayment(
    @CurrentUser() currentUser: IAuthPayload,
    @Param('provider') provider: PaymentType,
    @Body() createPaymentDto: CreatePaymentDto,
  ): Promise<CreatePaymentResponseDto> {
    return this.paymentService.createPayment(
      provider,
      createPaymentDto,
      currentUser,
    );
  }

  @Post('payment/:provider/check-status')
  @ApiParam({
    name: 'provider',
    enum: PaymentType,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CheckPaymentStatusResponseDto,
  })
  async checkPaymentStatus(
    @Param('provider') provider: PaymentType,
    @Body() checkStatusDto: CheckPaymentStatusDto,
  ): Promise<CheckPaymentStatusResponseDto> {
    return this.paymentService.checkStatus(provider, checkStatusDto);
  }

  @Post('payment/:provider/callback')
  @ApiParam({
    name: 'provider',
    enum: PaymentType,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CheckPaymentStatusResponseDto,
  })
  async paymentCallback(
    @Param('provider') provider: PaymentType,
    @Body() payload: PaymentCallbackDto,
  ): Promise<any> {
    console.log(payload);
    return this.paymentService.handleCallback(provider, payload);
  }
}
