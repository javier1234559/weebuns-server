"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingIndicator = void 0;
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
let PingIndicator = class PingIndicator extends terminus_1.HealthIndicator {
    constructor(http) {
        super();
        this.http = http;
    }
    async isHealthy(key, url) {
        try {
            await this.http.pingCheck(key, url);
            return this.getStatus(key, true);
        }
        catch (error) {
            throw new terminus_1.HealthCheckError('failed', error.causes);
        }
    }
};
exports.PingIndicator = PingIndicator;
exports.PingIndicator = PingIndicator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [terminus_1.HttpHealthIndicator])
], PingIndicator);
//# sourceMappingURL=ping.indicator.js.map