/*
  Warnings:

  - You are about to drop the column `completed_contents` on the `course_progress` table. All the data in the column will be lost.
  - You are about to drop the column `completed_weight` on the `course_progress` table. All the data in the column will be lost.
  - You are about to drop the column `current_unit_content_id` on the `course_progress` table. All the data in the column will be lost.
  - You are about to drop the column `next_unit_content_id` on the `course_progress` table. All the data in the column will be lost.
  - You are about to drop the column `is_published` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `total_weight` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `unit_id` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `units` table. All the data in the column will be lost.
  - You are about to drop the column `unit_weight` on the `units` table. All the data in the column will be lost.
  - You are about to drop the `unit_comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `unit_contents` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `status` on the `essays` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `lesson_id` to the `notes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('draft', 'published', 'private', 'deleted');

-- DropForeignKey
ALTER TABLE "course_progress" DROP CONSTRAINT "course_progress_current_unit_content_id_fkey";

-- DropForeignKey
ALTER TABLE "course_progress" DROP CONSTRAINT "course_progress_next_unit_content_id_fkey";

-- DropForeignKey
ALTER TABLE "notes" DROP CONSTRAINT "notes_unit_id_fkey";

-- DropForeignKey
ALTER TABLE "unit_comments" DROP CONSTRAINT "unit_comments_created_by_fkey";

-- DropForeignKey
ALTER TABLE "unit_comments" DROP CONSTRAINT "unit_comments_unit_id_fkey";

-- DropForeignKey
ALTER TABLE "unit_contents" DROP CONSTRAINT "unit_contents_unit_id_fkey";

-- DropIndex
DROP INDEX "course_progress_completed_contents_idx";

-- DropIndex
DROP INDEX "course_progress_completed_units_idx";

-- DropIndex
DROP INDEX "courses_deleted_at_is_published_idx";

-- DropIndex
DROP INDEX "courses_is_published_language_min_level_max_level_idx";

-- DropIndex
DROP INDEX "notes_is_bookmarked_idx";

-- DropIndex
DROP INDEX "notes_unit_id_idx";

-- AlterTable
ALTER TABLE "course_progress" DROP COLUMN "completed_contents",
DROP COLUMN "completed_weight",
DROP COLUMN "current_unit_content_id",
DROP COLUMN "next_unit_content_id",
ADD COLUMN     "completed_lessons" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "current_lesson_id" TEXT,
ADD COLUMN     "next_lesson_id" TEXT;

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "is_published",
DROP COLUMN "total_weight",
ADD COLUMN     "status" "ContentStatus" NOT NULL DEFAULT 'draft';

-- AlterTable
ALTER TABLE "essays" DROP COLUMN "status",
ADD COLUMN     "status" "ContentStatus" NOT NULL;

-- AlterTable
ALTER TABLE "notes" DROP COLUMN "unit_id",
ADD COLUMN     "lesson_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "units" DROP COLUMN "description",
DROP COLUMN "unit_weight";

-- DropTable
DROP TABLE "unit_comments";

-- DropTable
DROP TABLE "unit_contents";

-- DropEnum
DROP TYPE "EssayStatus";

-- CreateTable
CREATE TABLE "lessons" (
    "id" TEXT NOT NULL,
    "unit_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT,
    "content" JSONB NOT NULL,
    "order_index" INTEGER NOT NULL,
    "is_premium" BOOLEAN NOT NULL DEFAULT false,
    "is_required" BOOLEAN NOT NULL DEFAULT true,
    "status" "ContentStatus" NOT NULL DEFAULT 'draft',
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lessons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lesson_comments" (
    "id" TEXT NOT NULL,
    "lesson_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lesson_comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "lessons_unit_id_order_index_idx" ON "lessons"("unit_id", "order_index");

-- CreateIndex
CREATE INDEX "lessons_unit_id_is_premium_idx" ON "lessons"("unit_id", "is_premium");

-- CreateIndex
CREATE INDEX "lesson_comments_lesson_id_idx" ON "lesson_comments"("lesson_id");

-- CreateIndex
CREATE INDEX "lesson_comments_created_by_idx" ON "lesson_comments"("created_by");

-- CreateIndex
CREATE INDEX "courses_status_language_min_level_max_level_idx" ON "courses"("status", "language", "min_level", "max_level");

-- CreateIndex
CREATE INDEX "courses_deleted_at_idx" ON "courses"("deleted_at");

-- CreateIndex
CREATE INDEX "essays_status_language_idx" ON "essays"("status", "language");

-- CreateIndex
CREATE INDEX "notes_lesson_id_idx" ON "notes"("lesson_id");

-- AddForeignKey
ALTER TABLE "course_progress" ADD CONSTRAINT "course_progress_current_lesson_id_fkey" FOREIGN KEY ("current_lesson_id") REFERENCES "lessons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_progress" ADD CONSTRAINT "course_progress_next_lesson_id_fkey" FOREIGN KEY ("next_lesson_id") REFERENCES "lessons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "units" ADD CONSTRAINT "units_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_comments" ADD CONSTRAINT "lesson_comments_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_comments" ADD CONSTRAINT "lesson_comments_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
