import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from 'src/common/auth/auth.guard';
import { Roles, RolesGuard, UserRole } from 'src/common/auth/role.guard';

import { CreateSubscriptionPaymentDto } from './dto/create-subscription-payment.dto';
import { FindAllSubscriptionPaymentDto } from './dto/find-all-subscription-payment.dto';
import { FindOneSubscriptionPaymentResponseDto } from './dto/find-one-subscription-payment-response.dto';
import { SubscriptionPaymentResponse } from './dto/subscription-payment-response.dto';
import { UpdateSubscriptionPaymentDto } from './dto/update-subscription-payment.dto';
import { SubscriptionPaymentService } from './subscription-payment.service';

@Controller('subscription-payments')
@ApiTags('subscription-payments')
@UseGuards(AuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class SubscriptionPaymentController {
  constructor(
    private readonly subscriptionPaymentService: SubscriptionPaymentService,
  ) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: FindOneSubscriptionPaymentResponseDto,
  })
  create(
    @Body() createSubscriptionPaymentDto: CreateSubscriptionPaymentDto,
  ): Promise<FindOneSubscriptionPaymentResponseDto> {
    return this.subscriptionPaymentService.create(createSubscriptionPaymentDto);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: SubscriptionPaymentResponse,
  })
  findAll(
    @Query() query: FindAllSubscriptionPaymentDto,
  ): Promise<SubscriptionPaymentResponse> {
    return this.subscriptionPaymentService.findAll(query);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: FindOneSubscriptionPaymentResponseDto,
  })
  findOne(
    @Param('id') id: string,
  ): Promise<FindOneSubscriptionPaymentResponseDto> {
    return this.subscriptionPaymentService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: FindOneSubscriptionPaymentResponseDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateSubscriptionPaymentDto: UpdateSubscriptionPaymentDto,
  ): Promise<FindOneSubscriptionPaymentResponseDto> {
    return this.subscriptionPaymentService.update(
      id,
      updateSubscriptionPaymentDto,
    );
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: FindOneSubscriptionPaymentResponseDto,
  })
  remove(
    @Param('id') id: string,
  ): Promise<FindOneSubscriptionPaymentResponseDto> {
    return this.subscriptionPaymentService.delete(id);
  }
}
