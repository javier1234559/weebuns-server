"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepetitionLevel = exports.TopicCode = exports.TargetCode = exports.LevelCode = exports.LanguageCode = void 0;
var LanguageCode;
(function (LanguageCode) {
    LanguageCode["ENGLISH"] = "ENGLISH";
    LanguageCode["VIETNAMESE"] = "VIETNAMESE";
})(LanguageCode || (exports.LanguageCode = LanguageCode = {}));
var LevelCode;
(function (LevelCode) {
    LevelCode["BEGINNER"] = "BEGINNER";
    LevelCode["ELEMENTARY"] = "ELEMENTARY";
    LevelCode["INTERMEDIATE"] = "INTERMEDIATE";
    LevelCode["UPPER_INTERMEDIATE"] = "UPPER_INTERMEDIATE";
    LevelCode["ADVANCED"] = "ADVANCED";
    LevelCode["MASTER"] = "MASTER";
})(LevelCode || (exports.LevelCode = LevelCode = {}));
var TargetCode;
(function (TargetCode) {
    TargetCode["COMMUNICATION"] = "COMMUNICATION";
    TargetCode["IELTS"] = "IELTS";
    TargetCode["TOEIC"] = "TOEIC";
    TargetCode["OTHER"] = "OTHER";
})(TargetCode || (exports.TargetCode = TargetCode = {}));
var TopicCode;
(function (TopicCode) {
    TopicCode["BUSINESS"] = "BUSINESS";
    TopicCode["ACADEMIC"] = "ACADEMIC";
    TopicCode["TRAVEL"] = "TRAVEL";
    TopicCode["DAILY_LIFE"] = "DAILY_LIFE";
    TopicCode["TECHNOLOGY"] = "TECHNOLOGY";
    TopicCode["OTHER"] = "OTHER";
})(TopicCode || (exports.TopicCode = TopicCode = {}));
var RepetitionLevel;
(function (RepetitionLevel) {
    RepetitionLevel[RepetitionLevel["NEW"] = 0] = "NEW";
    RepetitionLevel[RepetitionLevel["LEVEL_1"] = 1] = "LEVEL_1";
    RepetitionLevel[RepetitionLevel["LEVEL_2"] = 2] = "LEVEL_2";
    RepetitionLevel[RepetitionLevel["LEVEL_3"] = 3] = "LEVEL_3";
    RepetitionLevel[RepetitionLevel["LEVEL_4"] = 4] = "LEVEL_4";
    RepetitionLevel[RepetitionLevel["LEVEL_5"] = 5] = "LEVEL_5";
    RepetitionLevel[RepetitionLevel["MASTERED"] = 6] = "MASTERED";
})(RepetitionLevel || (exports.RepetitionLevel = RepetitionLevel = {}));
//# sourceMappingURL=common.js.map