import { Decimal } from '@prisma/client/runtime/library';

export interface CourseRawResult {
  id: string;
  title: string;
  description: string | null;
  thumbnailUrl: string | null;
  level: string;
  price: Decimal | null;
  totalWeight: number;
  isPublished: boolean;
  createdAt: Date;
  creatorId: string;
  username: string;
  profilePicture: string | null;
  joinedAt: Date | null;
  isJoined: boolean;
}
