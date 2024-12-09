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
import { RolesGuard } from 'src/common/auth/role.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles, UserRole } from 'src/common/decorators/role.decorator';
import { IAuthPayload } from 'src/common/interface/auth-payload.interface';

import { CreateSubscriptionPaymentDto } from './dto/create-subscription-payment.dto';
import { FindAllSubscriptionPaymentDto } from './dto/find-all-subscription-payment.dto';
import { FindOneSubscriptionPaymentResponseDto } from './dto/find-one-subscription-payment-response.dto';
import { SubscriptionPaymentResponse } from './dto/subscription-payment-response.dto';
import { UpdateSubscriptionPaymentDto } from './dto/update-subscription-payment.dto';
import { SubscriptionPaymentService } from './subscription-payment.service';

@Controller('subscription-payments')
@ApiTags('subscription-payments')
@UseGuards(AuthGuard, RolesGuard)
export class SubscriptionPaymentController {
  constructor(
    private readonly subscriptionPaymentService: SubscriptionPaymentService,
  ) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: FindOneSubscriptionPaymentResponseDto,
  })
  create(
    @Body() createSubscriptionPaymentDto: CreateSubscriptionPaymentDto,
  ): Promise<FindOneSubscriptionPaymentResponseDto> {
    return this.subscriptionPaymentService.create(createSubscriptionPaymentDto);
  }

  @Get('/history')
  @Roles(UserRole.USER)
  @ApiResponse({
    status: HttpStatus.OK,
    type: SubscriptionPaymentResponse,
  })
  findAllMyHistory(
    @CurrentUser() currentUser: IAuthPayload,
    @Query() query: FindAllSubscriptionPaymentDto,
  ): Promise<SubscriptionPaymentResponse> {
    const userId = String(currentUser.sub);
    return this.subscriptionPaymentService.findAllHistory(userId, query);
  }

  @Get()
  @Roles(UserRole.ADMIN)
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
