"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVocabularyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_vocabulary_dto_1 = require("./create-vocabulary.dto");
class UpdateVocabularyDto extends (0, swagger_1.PartialType)(create_vocabulary_dto_1.CreateVocabularyDto) {
}
exports.UpdateVocabularyDto = UpdateVocabularyDto;
//# sourceMappingURL=update-vocabulary.dto.js.map