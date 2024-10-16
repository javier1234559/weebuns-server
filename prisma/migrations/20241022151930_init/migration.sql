/*
  Warnings:

  - You are about to drop the column `space_id` on the `Essay` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `Essay` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `FlashCard` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Vocabulary` table. All the data in the column will be lost.
  - Added the required column `id_space` to the `Essay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `Essay` table without a default value. This is not possible if the table is not empty.
  - Made the column `content` on table `Essay` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `created_by` to the `FlashCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `FlashCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_space` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `QuizQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Essay" DROP CONSTRAINT "Essay_space_id_fkey";

-- DropForeignKey
ALTER TABLE "FlashCard" DROP CONSTRAINT "FlashCard_id_user_fkey";

-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_user_id_fkey";

-- AlterTable
ALTER TABLE "Essay" DROP COLUMN "space_id",
DROP COLUMN "thumbnail",
ADD COLUMN     "cover_url" TEXT,
ADD COLUMN     "id_space" INTEGER NOT NULL,
ADD COLUMN     "language" TEXT NOT NULL,
ALTER COLUMN "content" SET NOT NULL;

-- AlterTable
ALTER TABLE "FlashCard" DROP COLUMN "id_user",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "review_date" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "user_id",
ADD COLUMN     "created_by" INTEGER NOT NULL,
ADD COLUMN     "id_space" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "QuizQuestion" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "username" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Vocabulary" DROP COLUMN "image",
ADD COLUMN     "id_essay_link" TEXT,
ADD COLUMN     "id_space" INTEGER,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "reference_link" TEXT,
ALTER COLUMN "definition" DROP NOT NULL,
ALTER COLUMN "pronunciation" DROP NOT NULL,
ALTER COLUMN "example" DROP NOT NULL,
ALTER COLUMN "part_of_speech" DROP NOT NULL,
ALTER COLUMN "mastery_level" DROP NOT NULL,
ALTER COLUMN "is_need_review" DROP NOT NULL,
ALTER COLUMN "next_review_date" SET DATA TYPE TEXT,
ALTER COLUMN "ease_factor" DROP NOT NULL,
ALTER COLUMN "interval" DROP NOT NULL;

-- CreateTable
CREATE TABLE "UserLanguage" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "proficiency_level" TEXT NOT NULL,
    "is_native" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserLanguage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hashtag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "usage_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hashtag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EssayHashtag" (
    "id" SERIAL NOT NULL,
    "essay_id" INTEGER NOT NULL,
    "hashtag_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EssayHashtag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Correction" (
    "id" SERIAL NOT NULL,
    "essay_id" INTEGER NOT NULL,
    "overall_comment" TEXT,
    "rating" INTEGER,
    "created_by" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Correction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CorrectionSentence" (
    "id" SERIAL NOT NULL,
    "id_correction" INTEGER NOT NULL,
    "original_text" TEXT NOT NULL,
    "corrected_text" TEXT,
    "explanation" TEXT,
    "is_correct" BOOLEAN NOT NULL DEFAULT false,
    "rating" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CorrectionSentence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CorrectionReply" (
    "id" SERIAL NOT NULL,
    "correction_id" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "created_by" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CorrectionReply_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserLanguage_user_id_language_key" ON "UserLanguage"("user_id", "language");

-- CreateIndex
CREATE UNIQUE INDEX "Hashtag_name_key" ON "Hashtag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "EssayHashtag_essay_id_hashtag_id_key" ON "EssayHashtag"("essay_id", "hashtag_id");

-- AddForeignKey
ALTER TABLE "UserLanguage" ADD CONSTRAINT "UserLanguage_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Essay" ADD CONSTRAINT "Essay_id_space_fkey" FOREIGN KEY ("id_space") REFERENCES "Space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EssayHashtag" ADD CONSTRAINT "EssayHashtag_essay_id_fkey" FOREIGN KEY ("essay_id") REFERENCES "Essay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EssayHashtag" ADD CONSTRAINT "EssayHashtag_hashtag_id_fkey" FOREIGN KEY ("hashtag_id") REFERENCES "Hashtag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Correction" ADD CONSTRAINT "Correction_essay_id_fkey" FOREIGN KEY ("essay_id") REFERENCES "Essay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Correction" ADD CONSTRAINT "Correction_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CorrectionSentence" ADD CONSTRAINT "CorrectionSentence_id_correction_fkey" FOREIGN KEY ("id_correction") REFERENCES "Correction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CorrectionReply" ADD CONSTRAINT "CorrectionReply_correction_id_fkey" FOREIGN KEY ("correction_id") REFERENCES "Correction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CorrectionReply" ADD CONSTRAINT "CorrectionReply_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_id_space_fkey" FOREIGN KEY ("id_space") REFERENCES "Space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vocabulary" ADD CONSTRAINT "Vocabulary_id_space_fkey" FOREIGN KEY ("id_space") REFERENCES "Space"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlashCard" ADD CONSTRAINT "FlashCard_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
