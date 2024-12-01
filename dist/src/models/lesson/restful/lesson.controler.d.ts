import { LessonResponseDto } from 'src/models/lesson/dto/lesson-response.dto';
import { LessonService } from 'src/models/lesson/lesson.service';
export declare class LessonController {
    private readonly lessonService;
    constructor(lessonService: LessonService);
    getLesson(id: string): Promise<LessonResponseDto>;
}
