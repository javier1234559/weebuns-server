import { DiskHealthIndicator, HealthCheckService, MemoryHealthIndicator } from '@nestjs/terminus';
import { PingIndicator } from 'src/common/health/ping.indicator';
export declare class HealthController {
    private health;
    private memory;
    private disk;
    private ping;
    constructor(health: HealthCheckService, memory: MemoryHealthIndicator, disk: DiskHealthIndicator, ping: PingIndicator);
    check(): Promise<import("@nestjs/terminus").HealthCheckResult>;
}
