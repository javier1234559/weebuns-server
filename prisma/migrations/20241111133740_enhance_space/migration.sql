/*
  Warnings:

  - You are about to drop the column `id_correction` on the `correction_sentences` table. All the data in the column will be lost.
  - You are about to drop the column `id_space` on the `essays` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `is_private` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `course_id` on the `spaces` table. All the data in the column will be lost.
  - The `current_level` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `correction_id` to the `correction_sentences` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `level` on the `courses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `space_id` to the `essays` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `spaces` table without a default value. This is not possible if the table is not empty.
  - Added the required column `target` to the `spaces` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchase_price` to the `user_courses` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Language" AS ENUM ('ENGLISH', 'JAPANESE', 'KOREAN', 'CHINESE', 'VIETNAMESE', 'FRENCH', 'GERMAN', 'SPANISH');

-- CreateEnum
CREATE TYPE "ProficiencyLevel" AS ENUM ('BEGINNER', 'ELEMENTARY', 'INTERMEDIATE', 'UPPER_INTERMEDIATE', 'ADVANCED', 'MASTER');

-- CreateEnum
CREATE TYPE "SpaceTarget" AS ENUM ('GENERAL_LEARNING', 'TEST_PREPARATION', 'BUSINESS', 'ACADEMIC', 'CONVERSATION', 'TRAVEL', 'PROFESSIONAL', 'ORTHER');

-- DropForeignKey
ALTER TABLE "correction_sentences" DROP CONSTRAINT "correction_sentences_id_correction_fkey";

-- DropForeignKey
ALTER TABLE "essays" DROP CONSTRAINT "essays_id_space_fkey";

-- DropForeignKey
ALTER TABLE "spaces" DROP CONSTRAINT "spaces_course_id_fkey";

-- AlterTable
ALTER TABLE "correction_sentences" DROP COLUMN "id_correction",
ADD COLUMN     "correction_id" TEXT NOT NULL,
ALTER COLUMN "rating" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "corrections" ALTER COLUMN "rating" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "level",
ADD COLUMN     "level" "ProficiencyLevel" NOT NULL;

-- AlterTable
ALTER TABLE "essays" DROP COLUMN "id_space",
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "space_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "notes" DROP COLUMN "color",
DROP COLUMN "is_private",
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "space_id" TEXT;

-- AlterTable
ALTER TABLE "spaces" DROP COLUMN "course_id",
ADD COLUMN     "language" "Language" NOT NULL,
ADD COLUMN     "target" "SpaceTarget" NOT NULL;

-- AlterTable
ALTER TABLE "user_courses" ADD COLUMN     "payment_status" TEXT DEFAULT 'pending',
ADD COLUMN     "purchase_price" DECIMAL(10,2) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "current_level",
ADD COLUMN     "current_level" "ProficiencyLevel" NOT NULL DEFAULT 'BEGINNER';

-- AlterTable
ALTER TABLE "vocabularies" ADD COLUMN     "image_url" TEXT;

-- DropEnum
DROP TYPE "CerfLevel";

-- CreateTable
CREATE TABLE "space_courses" (
    "id" TEXT NOT NULL,
    "space_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "space_courses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "space_courses_space_id_course_id_key" ON "space_courses"("space_id", "course_id");

-- CreateIndex
CREATE INDEX "courses_is_published_level_idx" ON "courses"("is_published", "level");

-- CreateIndex
CREATE INDEX "essays_status_language_idx" ON "essays"("status", "language");

-- CreateIndex
CREATE INDEX "user_courses_payment_status_idx" ON "user_courses"("payment_status");

-- CreateIndex
CREATE INDEX "vocabularies_term_idx" ON "vocabularies"("term");

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "spaces"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "space_courses" ADD CONSTRAINT "space_courses_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "spaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "space_courses" ADD CONSTRAINT "space_courses_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "essays" ADD CONSTRAINT "essays_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "spaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "correction_sentences" ADD CONSTRAINT "correction_sentences_correction_id_fkey" FOREIGN KEY ("correction_id") REFERENCES "corrections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
