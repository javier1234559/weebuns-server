import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/common/prisma/prisma.module';
import { PaymentService } from 'src/models/subscription/payment.service';
import { SubscriptionController } from 'src/models/subscription/subscription.controller';
import { SubscriptionService } from 'src/models/subscription/subscription.service';

@Module({
  imports: [PrismaModule],
  controllers: [SubscriptionController],
  providers: [SubscriptionService, PaymentService],
})
export class SubscriptionModule {}
