// src/common/middleware/activity.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';

import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ActivityTrackingMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // Only track if user is authenticated
    if (req.user?.id) {
      const activityTypeMap = {
        '/api/essays': 'essay',
        '/api/vocabularies': 'vocabulary',
        '/api/notes': 'note',
        '/api/corrections': 'correction',
      };

      const path = Object.keys(activityTypeMap).find((p) =>
        req.path.startsWith(p),
      );

      if (path && ['POST', 'PUT'].includes(req.method)) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        await this.prisma.$executeRaw`
          WITH previous_streak AS (
            SELECT streak_count 
            FROM user_activities 
            WHERE user_id = ${req.user.id}
              AND time >= (CURRENT_DATE - INTERVAL '1 day')
            ORDER BY time DESC
            LIMIT 1
          )
          INSERT INTO user_activities (
            time, 
            user_id, 
            activity_type,
            streak_count
          )
          VALUES (
            NOW(),
            ${req.user.id},
            ${activityTypeMap[path]},
            COALESCE(
              (SELECT 
                CASE 
                  WHEN time >= CURRENT_DATE - INTERVAL '1 day' 
                  THEN streak_count + 1 
                  ELSE 1 
                END 
              FROM previous_streak),
              1
            )
          );
        `;
      }
    }

    next();
  }
}
