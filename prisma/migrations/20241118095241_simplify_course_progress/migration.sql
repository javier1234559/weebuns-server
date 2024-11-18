/*
  Warnings:

  - You are about to drop the column `complete_weight` on the `unit_contents` table. All the data in the column will be lost.
  - You are about to drop the `unit_content_progress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `unit_progress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "unit_content_progress" DROP CONSTRAINT "unit_content_progress_unit_content_id_fkey";

-- DropForeignKey
ALTER TABLE "unit_content_progress" DROP CONSTRAINT "unit_content_progress_unit_progress_id_fkey";

-- DropForeignKey
ALTER TABLE "unit_progress" DROP CONSTRAINT "unit_progress_course_progress_id_fkey";

-- DropForeignKey
ALTER TABLE "unit_progress" DROP CONSTRAINT "unit_progress_unit_id_fkey";

-- DropIndex
DROP INDEX "course_progress_last_accessed_at_idx";

-- AlterTable
ALTER TABLE "course_progress" ADD COLUMN     "completed_contents" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "completed_units" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "current_unit_content_id" TEXT,
ADD COLUMN     "next_unit_content_id" TEXT,
ADD COLUMN     "next_unit_id" TEXT;

-- AlterTable
ALTER TABLE "unit_contents" DROP COLUMN "complete_weight",
ADD COLUMN     "content_weight" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "units" ADD COLUMN     "unit_weight" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "unit_content_progress";

-- DropTable
DROP TABLE "unit_progress";

-- CreateIndex
CREATE INDEX "course_progress_user_id_idx" ON "course_progress"("user_id");

-- CreateIndex
CREATE INDEX "course_progress_course_id_idx" ON "course_progress"("course_id");

-- CreateIndex
CREATE INDEX "course_progress_completed_units_idx" ON "course_progress"("completed_units");

-- CreateIndex
CREATE INDEX "course_progress_completed_contents_idx" ON "course_progress"("completed_contents");

-- AddForeignKey
ALTER TABLE "course_progress" ADD CONSTRAINT "course_progress_next_unit_id_fkey" FOREIGN KEY ("next_unit_id") REFERENCES "units"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_progress" ADD CONSTRAINT "course_progress_current_unit_content_id_fkey" FOREIGN KEY ("current_unit_content_id") REFERENCES "unit_contents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_progress" ADD CONSTRAINT "course_progress_next_unit_content_id_fkey" FOREIGN KEY ("next_unit_content_id") REFERENCES "unit_contents"("id") ON DELETE SET NULL ON UPDATE CASCADE;
