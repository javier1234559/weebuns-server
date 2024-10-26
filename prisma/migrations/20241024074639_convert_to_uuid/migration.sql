/*
  Warnings:

  - The primary key for the `Correction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CorrectionReply` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CorrectionSentence` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Essay` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `EssayHashtag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `FlashCard` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Follower` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Hashtag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Quiz` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `QuizQuestion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id_vocabulary` column on the `QuizQuestion` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Space` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserLanguage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Vocabulary` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id_essay_link` column on the `Vocabulary` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `id_space` column on the `Vocabulary` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `id` on the `Correction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `essay_id` on the `Correction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `created_by` on the `Correction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `CorrectionReply` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `correction_id` on the `CorrectionReply` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `created_by` on the `CorrectionReply` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `CorrectionSentence` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_correction` on the `CorrectionSentence` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Essay` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `created_by` on the `Essay` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_space` on the `Essay` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `EssayHashtag` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `essay_id` on the `EssayHashtag` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `hashtag_id` on the `EssayHashtag` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `FlashCard` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_vocabulary` on the `FlashCard` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `created_by` on the `FlashCard` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Follower` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_follower` on the `Follower` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_following` on the `Follower` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Hashtag` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Quiz` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `created_by` on the `Quiz` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_space` on the `Quiz` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `QuizQuestion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `quiz_id` on the `QuizQuestion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Space` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `created_by` on the `Space` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `UserLanguage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `UserLanguage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Vocabulary` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `created_by` on the `Vocabulary` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Correction" DROP CONSTRAINT "Correction_created_by_fkey";

-- DropForeignKey
ALTER TABLE "Correction" DROP CONSTRAINT "Correction_essay_id_fkey";

-- DropForeignKey
ALTER TABLE "CorrectionReply" DROP CONSTRAINT "CorrectionReply_correction_id_fkey";

-- DropForeignKey
ALTER TABLE "CorrectionReply" DROP CONSTRAINT "CorrectionReply_created_by_fkey";

-- DropForeignKey
ALTER TABLE "CorrectionSentence" DROP CONSTRAINT "CorrectionSentence_id_correction_fkey";

-- DropForeignKey
ALTER TABLE "Essay" DROP CONSTRAINT "Essay_created_by_fkey";

-- DropForeignKey
ALTER TABLE "Essay" DROP CONSTRAINT "Essay_id_space_fkey";

-- DropForeignKey
ALTER TABLE "EssayHashtag" DROP CONSTRAINT "EssayHashtag_essay_id_fkey";

-- DropForeignKey
ALTER TABLE "EssayHashtag" DROP CONSTRAINT "EssayHashtag_hashtag_id_fkey";

-- DropForeignKey
ALTER TABLE "FlashCard" DROP CONSTRAINT "FlashCard_created_by_fkey";

-- DropForeignKey
ALTER TABLE "FlashCard" DROP CONSTRAINT "FlashCard_id_vocabulary_fkey";

-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_id_follower_fkey";

-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_id_following_fkey";

-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_created_by_fkey";

-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_id_space_fkey";

-- DropForeignKey
ALTER TABLE "QuizQuestion" DROP CONSTRAINT "QuizQuestion_quiz_id_fkey";

-- DropForeignKey
ALTER TABLE "Space" DROP CONSTRAINT "Space_created_by_fkey";

-- DropForeignKey
ALTER TABLE "UserLanguage" DROP CONSTRAINT "UserLanguage_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Vocabulary" DROP CONSTRAINT "Vocabulary_created_by_fkey";

-- DropForeignKey
ALTER TABLE "Vocabulary" DROP CONSTRAINT "Vocabulary_id_space_fkey";

-- AlterTable
ALTER TABLE "Correction" DROP CONSTRAINT "Correction_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "essay_id",
ADD COLUMN     "essay_id" UUID NOT NULL,
DROP COLUMN "created_by",
ADD COLUMN     "created_by" UUID NOT NULL,
ADD CONSTRAINT "Correction_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "CorrectionReply" DROP CONSTRAINT "CorrectionReply_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "correction_id",
ADD COLUMN     "correction_id" UUID NOT NULL,
DROP COLUMN "created_by",
ADD COLUMN     "created_by" UUID NOT NULL,
ADD CONSTRAINT "CorrectionReply_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "CorrectionSentence" DROP CONSTRAINT "CorrectionSentence_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "id_correction",
ADD COLUMN     "id_correction" UUID NOT NULL,
ADD CONSTRAINT "CorrectionSentence_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Essay" DROP CONSTRAINT "Essay_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "created_by",
ADD COLUMN     "created_by" UUID NOT NULL,
DROP COLUMN "id_space",
ADD COLUMN     "id_space" UUID NOT NULL,
ADD CONSTRAINT "Essay_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "EssayHashtag" DROP CONSTRAINT "EssayHashtag_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "essay_id",
ADD COLUMN     "essay_id" UUID NOT NULL,
DROP COLUMN "hashtag_id",
ADD COLUMN     "hashtag_id" UUID NOT NULL,
ADD CONSTRAINT "EssayHashtag_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "FlashCard" DROP CONSTRAINT "FlashCard_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "id_vocabulary",
ADD COLUMN     "id_vocabulary" UUID NOT NULL,
DROP COLUMN "created_by",
ADD COLUMN     "created_by" UUID NOT NULL,
ADD CONSTRAINT "FlashCard_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "id_follower",
ADD COLUMN     "id_follower" UUID NOT NULL,
DROP COLUMN "id_following",
ADD COLUMN     "id_following" UUID NOT NULL,
ADD CONSTRAINT "Follower_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Hashtag" DROP CONSTRAINT "Hashtag_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "Hashtag_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "created_by",
ADD COLUMN     "created_by" UUID NOT NULL,
DROP COLUMN "id_space",
ADD COLUMN     "id_space" UUID NOT NULL,
ADD CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "QuizQuestion" DROP CONSTRAINT "QuizQuestion_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "quiz_id",
ADD COLUMN     "quiz_id" UUID NOT NULL,
DROP COLUMN "id_vocabulary",
ADD COLUMN     "id_vocabulary" UUID,
ADD CONSTRAINT "QuizQuestion_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Space" DROP CONSTRAINT "Space_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "created_by",
ADD COLUMN     "created_by" UUID NOT NULL,
ADD CONSTRAINT "Space_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserLanguage" DROP CONSTRAINT "UserLanguage_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "user_id",
ADD COLUMN     "user_id" UUID NOT NULL,
ADD CONSTRAINT "UserLanguage_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Vocabulary" DROP CONSTRAINT "Vocabulary_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "created_by",
ADD COLUMN     "created_by" UUID NOT NULL,
DROP COLUMN "id_essay_link",
ADD COLUMN     "id_essay_link" UUID,
DROP COLUMN "id_space",
ADD COLUMN     "id_space" UUID,
ADD CONSTRAINT "Vocabulary_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "EssayHashtag_essay_id_hashtag_id_key" ON "EssayHashtag"("essay_id", "hashtag_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserLanguage_user_id_language_key" ON "UserLanguage"("user_id", "language");

-- AddForeignKey
ALTER TABLE "UserLanguage" ADD CONSTRAINT "UserLanguage_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_id_follower_fkey" FOREIGN KEY ("id_follower") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_id_following_fkey" FOREIGN KEY ("id_following") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Space" ADD CONSTRAINT "Space_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Essay" ADD CONSTRAINT "Essay_id_space_fkey" FOREIGN KEY ("id_space") REFERENCES "Space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Essay" ADD CONSTRAINT "Essay_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "QuizQuestion" ADD CONSTRAINT "QuizQuestion_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vocabulary" ADD CONSTRAINT "Vocabulary_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vocabulary" ADD CONSTRAINT "Vocabulary_id_space_fkey" FOREIGN KEY ("id_space") REFERENCES "Space"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlashCard" ADD CONSTRAINT "FlashCard_id_vocabulary_fkey" FOREIGN KEY ("id_vocabulary") REFERENCES "Vocabulary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlashCard" ADD CONSTRAINT "FlashCard_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
