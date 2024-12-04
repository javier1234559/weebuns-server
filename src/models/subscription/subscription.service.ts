import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { FindSubscriptionStatusResponseDto } from 'src/models/subscription/dto/check-subscription-status.dto';

@Injectable()
export class SubscriptionService {
  constructor(private readonly prisma: PrismaService) {}

  async getStatus(userId: string): Promise<FindSubscriptionStatusResponseDto> {
    const subscription = await this.prisma.subscription.findFirst({
      where: {
        userId,
        status: 'ACTIVE',
        endDate: { gt: new Date() },
      },
      orderBy: { startDate: 'desc' },
    });

    return {
      isActive: !!subscription,
      type: subscription?.type || 'FREE',
      expiresAt: subscription?.endDate || new Date(),
    };
  }
}
