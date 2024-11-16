/*
  Warnings:

  - You are about to drop the column `topic` on the `spaces` table. All the data in the column will be lost.
  - Added the required column `course_type` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max_level` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `min_level` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "courses_is_published_level_idx";

-- DropIndex
DROP INDEX "spaces_language_target_current_level_topic_idx";

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "course_type" TEXT NOT NULL,
ADD COLUMN     "language" TEXT NOT NULL,
ADD COLUMN     "max_level" TEXT NOT NULL,
ADD COLUMN     "min_level" TEXT NOT NULL,
ADD COLUMN     "topics" TEXT[];

-- AlterTable
ALTER TABLE "spaces" DROP COLUMN "topic",
ADD COLUMN     "topics" TEXT[];

-- CreateIndex
CREATE INDEX "courses_is_published_language_min_level_max_level_idx" ON "courses"("is_published", "language", "min_level", "max_level");

-- CreateIndex
CREATE INDEX "courses_topics_idx" ON "courses"("topics");

-- CreateIndex
CREATE INDEX "spaces_language_target_current_level_idx" ON "spaces"("language", "target", "current_level");
