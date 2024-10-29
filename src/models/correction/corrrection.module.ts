import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/common/prisma/prisma.module';
import { CorrectionService } from 'src/models/correction/correction.service';
import { CorrectionResolver } from 'src/models/correction/graphql/correction.resolver';

@Module({
  imports: [PrismaModule],
  providers: [CorrectionResolver, CorrectionService],
  exports: [],
  controllers: [],
})
export class CorrectionModule {}
