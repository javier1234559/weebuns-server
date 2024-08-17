import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  PrismaHealthIndicator,
} from '@nestjs/terminus';

import { PingIndicator } from 'src/common/health/ping.indicator';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    // private prismaIndicator: PrismaHealthIndicator,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
    private ping: PingIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.memory.checkHeap('memory_heap', 1000 * 1024 * 1024),
      () => this.memory.checkRSS('memory_RSS', 1000 * 1024 * 1024),
      () =>
        this.disk.checkStorage('disk_health', {
          thresholdPercent: 10,
          path: '/',
        }),
      () => this.ping.isHealthy('nestjs-docs', 'https://nestjs.com/'),
    ]);
  }
}
