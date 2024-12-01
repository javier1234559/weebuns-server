import { HealthIndicator, HealthIndicatorResult, HttpHealthIndicator } from '@nestjs/terminus';
export declare class PingIndicator extends HealthIndicator {
    private http;
    constructor(http: HttpHealthIndicator);
    isHealthy(key: string, url: string): Promise<HealthIndicatorResult>;
}
