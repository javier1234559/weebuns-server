/*
  Warnings:

  - You are about to drop the column `current_level` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `languages` on the `users` table. All the data in the column will be lost.
  - Changed the type of `level` on the `courses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `current_level` to the `spaces` table without a default value. This is not possible if the table is not empty.
  - Added the required column `target_level` to the `spaces` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topic` to the `spaces` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `language` on the `spaces` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `target` on the `spaces` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `native_language` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "spaces_language_target_idx";

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "level",
ADD COLUMN     "level" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "spaces" ADD COLUMN     "current_level" TEXT NOT NULL,
ADD COLUMN     "target_level" TEXT NOT NULL,
ADD COLUMN     "topic" TEXT NOT NULL,
DROP COLUMN "language",
ADD COLUMN     "language" TEXT NOT NULL,
DROP COLUMN "target",
ADD COLUMN     "target" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "current_level",
DROP COLUMN "languages",
ADD COLUMN     "native_language" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Language";

-- DropEnum
DROP TYPE "ProficiencyLevel";

-- DropEnum
DROP TYPE "SpaceTarget";

-- CreateTable
CREATE TABLE "reference_data" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "metadata" JSONB,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "order_index" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reference_data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "reference_data_type_is_active_order_index_idx" ON "reference_data"("type", "is_active", "order_index");

-- CreateIndex
CREATE UNIQUE INDEX "reference_data_type_code_key" ON "reference_data"("type", "code");

-- CreateIndex
CREATE INDEX "courses_is_published_level_idx" ON "courses"("is_published", "level");

-- CreateIndex
CREATE INDEX "spaces_language_target_current_level_topic_idx" ON "spaces"("language", "target", "current_level", "topic");
