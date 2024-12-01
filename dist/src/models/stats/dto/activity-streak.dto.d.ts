export interface RawActivityDto {
    date: string;
    level: number;
    streak: number;
}
export declare class GetActivityStreakDto {
    startDate?: string;
    endDate?: string;
}
export declare class ActivityDataDto {
    level: number;
    data: {
        streak: number;
    };
}
export declare class ActivityStreakResponseDto {
    activities: Record<string, ActivityDataDto>[];
    currentStreak: ActivityDataDto;
}
