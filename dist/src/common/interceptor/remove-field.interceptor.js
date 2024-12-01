"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveFieldInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let RemoveFieldInterceptor = class RemoveFieldInterceptor {
    constructor() {
        this.FIELDS_TO_REMOVE = ['password', 'passwordHash', 'deletedAt'];
    }
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((data) => this.removeFields(data)));
    }
    removeFields(data) {
        if (Array.isArray(data)) {
            return data.map((item) => this.removeFields(item));
        }
        if (data && typeof data === 'object') {
            for (const key of Object.keys(data)) {
                if (this.FIELDS_TO_REMOVE.includes(key)) {
                    delete data[key];
                }
                else if (typeof data[key] === 'object') {
                    data[key] = this.removeFields(data[key]);
                }
            }
        }
        return data;
    }
};
exports.RemoveFieldInterceptor = RemoveFieldInterceptor;
exports.RemoveFieldInterceptor = RemoveFieldInterceptor = __decorate([
    (0, common_1.Injectable)()
], RemoveFieldInterceptor);
//# sourceMappingURL=remove-field.interceptor.js.map