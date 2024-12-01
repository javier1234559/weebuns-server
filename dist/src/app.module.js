"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const apollo_1 = require("@nestjs/apollo");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const graphql_1 = require("@nestjs/graphql");
const schedule_1 = require("@nestjs/schedule");
const default_1 = require("@apollo/server/plugin/landingPage/default");
const path_1 = require("path");
const cache_key_interceptor_1 = require("./common/cache/cache-key.interceptor");
const common_module_1 = require("./common/common.module");
const health_module_1 = require("./common/health/health.module");
const activity_interceptor_1 = require("./common/interceptor/activity.interceptor");
const remove_field_interceptor_1 = require("./common/interceptor/remove-field.interceptor");
const transaction_interceptor_1 = require("./common/interceptor/transaction.interceptor");
const ai_module_1 = require("./models/ai/ai.module");
const corrrection_module_1 = require("./models/correction/corrrection.module");
const course_module_1 = require("./models/course/course.module");
const essay_module_1 = require("./models/essay/essay.module");
const hashtag_module_1 = require("./models/hashtag/hashtag.module");
const lesson_module_1 = require("./models/lesson/lesson.module");
const note_module_1 = require("./models/note/note.module");
const space_module_1 = require("./models/space/space.module");
const stats_module_1 = require("./models/stats/stats.module");
const unit_module_1 = require("./models/unit/unit.module");
const user_module_1 = require("./models/user/user.module");
const vocabulary_module_1 = require("./models/vocabulary/vocabulary.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            common_module_1.CommonModule,
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
                playground: false,
                plugins: [(0, default_1.ApolloServerPluginLandingPageLocalDefault)()],
            }),
            user_module_1.UserModule,
            space_module_1.SpaceModule,
            essay_module_1.EssayModule,
            corrrection_module_1.CorrectionModule,
            vocabulary_module_1.VocabularyModule,
            health_module_1.HealthModule,
            hashtag_module_1.HashTagModule,
            stats_module_1.StatsModule,
            course_module_1.CourseModule,
            unit_module_1.UnitModule,
            lesson_module_1.LessonModule,
            note_module_1.NoteModule,
            ai_module_1.AiModule,
        ],
        providers: [
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: remove_field_interceptor_1.RemoveFieldInterceptor,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: transaction_interceptor_1.TransactionInterceptor,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: cache_key_interceptor_1.CacheKeyInterceptor,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: activity_interceptor_1.ActivityInterceptor,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map