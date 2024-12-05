import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/common/prisma/prisma.module';

import { SubscriptionPaymentController } from './subscription-payment.controller';
import { SubscriptionPaymentService } from './subscription-payment.service';

@Module({
  imports: [PrismaModule],
  controllers: [SubscriptionPaymentController],
  providers: [SubscriptionPaymentService],
  exports: [SubscriptionPaymentService],
})
export class SubscriptionPaymentModule {}
