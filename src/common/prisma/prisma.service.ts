import { Injectable, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

import { softDeleteMiddleware } from 'src/common/prisma/soft-delete.middlware';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
    this.$use(softDeleteMiddleware);
  }

  async onModuleInit() {
    await this.$connect();
  }
}
