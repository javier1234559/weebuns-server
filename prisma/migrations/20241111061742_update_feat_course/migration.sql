/*
  Warnings:

  - You are about to drop the `Correction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CorrectionReply` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CorrectionSentence` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Essay` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EssayHashtag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FlashCard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Follower` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hashtag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Quiz` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuizQuestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Space` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserLanguage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vocabulary` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "CefrLevel" AS ENUM ('a1', 'a2', 'b1', 'b2', 'c1', 'c2');

-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'teacher';

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

-- DropTable
DROP TABLE "Correction";

-- DropTable
DROP TABLE "CorrectionReply";

-- DropTable
DROP TABLE "CorrectionSentence";

-- DropTable
DROP TABLE "Essay";

-- DropTable
DROP TABLE "EssayHashtag";

-- DropTable
DROP TABLE "FlashCard";

-- DropTable
DROP TABLE "Follower";

-- DropTable
DROP TABLE "Hashtag";

-- DropTable
DROP TABLE "Quiz";

-- DropTable
DROP TABLE "QuizQuestion";

-- DropTable
DROP TABLE "Space";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserLanguage";

-- DropTable
DROP TABLE "Vocabulary";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'user',
    "auth_provider" "AuthProvider" NOT NULL DEFAULT 'local',
    "auth_provider_id" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "profile_picture" TEXT,
    "is_email_verified" BOOLEAN NOT NULL DEFAULT false,
    "current_level" "CefrLevel" NOT NULL DEFAULT 'a1',
    "languages" JSONB NOT NULL DEFAULT '[]',
    "last_login" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses" (
    "id" TEXT NOT NULL,
    "current_unit_id" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "thumbnail_url" TEXT,
    "level" "CefrLevel" NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "total_weight" INTEGER NOT NULL DEFAULT 0,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "reviews" JSONB NOT NULL DEFAULT '[]',
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_courses" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "payment_id" TEXT,
    "purchased_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "units" (
    "id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "order_index" INTEGER NOT NULL,
    "comments" JSONB NOT NULL DEFAULT '[]',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unit_contents" (
    "id" TEXT NOT NULL,
    "unit_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content_type" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "order_index" INTEGER NOT NULL,
    "is_premium" BOOLEAN NOT NULL DEFAULT false,
    "is_required" BOOLEAN NOT NULL DEFAULT true,
    "complete_weight" INTEGER NOT NULL DEFAULT 1,
    "is_done" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "unit_contents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notes" (
    "id" TEXT NOT NULL,
    "unit_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "color" TEXT,
    "tags" JSONB NOT NULL DEFAULT '[]',
    "is_bookmarked" BOOLEAN NOT NULL DEFAULT false,
    "is_private" BOOLEAN NOT NULL DEFAULT true,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vocabularies" (
    "id" TEXT NOT NULL,
    "space_id" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "example_sentence" TEXT,
    "reference_link" TEXT,
    "reference_name" TEXT,
    "tags" JSONB NOT NULL DEFAULT '[]',
    "repetition_level" INTEGER NOT NULL DEFAULT 0,
    "next_review" TIMESTAMP(3),
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vocabularies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spaces" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "course_id" TEXT,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "spaces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "essays" (
    "id" TEXT NOT NULL,
    "id_space" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "upvote_count" INTEGER NOT NULL DEFAULT 0,
    "summary" TEXT,
    "content" TEXT NOT NULL,
    "cover_url" TEXT,
    "status" "EssayStatus" NOT NULL,
    "language" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "essays_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "essay_hashtags" (
    "id" TEXT NOT NULL,
    "essay_id" TEXT NOT NULL,
    "hashtag_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "essay_hashtags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hashtags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "usage_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hashtags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "corrections" (
    "id" TEXT NOT NULL,
    "essay_id" TEXT NOT NULL,
    "overall_comment" TEXT,
    "rating" INTEGER,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "corrections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "correction_sentences" (
    "id" TEXT NOT NULL,
    "id_correction" TEXT NOT NULL,
    "original_text" TEXT NOT NULL,
    "corrected_text" TEXT,
    "explanation" TEXT,
    "is_correct" BOOLEAN NOT NULL DEFAULT false,
    "rating" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "correction_sentences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "correction_replies" (
    "id" TEXT NOT NULL,
    "correction_id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "correction_replies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_courses_user_id_course_id_key" ON "user_courses"("user_id", "course_id");

-- CreateIndex
CREATE UNIQUE INDEX "essay_hashtags_essay_id_hashtag_id_key" ON "essay_hashtags"("essay_id", "hashtag_id");

-- CreateIndex
CREATE UNIQUE INDEX "hashtags_name_key" ON "hashtags"("name");

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_current_unit_id_fkey" FOREIGN KEY ("current_unit_id") REFERENCES "units"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_courses" ADD CONSTRAINT "user_courses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_courses" ADD CONSTRAINT "user_courses_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "units" ADD CONSTRAINT "units_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unit_contents" ADD CONSTRAINT "unit_contents_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vocabularies" ADD CONSTRAINT "vocabularies_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "spaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vocabularies" ADD CONSTRAINT "vocabularies_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spaces" ADD CONSTRAINT "spaces_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spaces" ADD CONSTRAINT "spaces_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "essays" ADD CONSTRAINT "essays_id_space_fkey" FOREIGN KEY ("id_space") REFERENCES "spaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "essays" ADD CONSTRAINT "essays_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "essay_hashtags" ADD CONSTRAINT "essay_hashtags_essay_id_fkey" FOREIGN KEY ("essay_id") REFERENCES "essays"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "essay_hashtags" ADD CONSTRAINT "essay_hashtags_hashtag_id_fkey" FOREIGN KEY ("hashtag_id") REFERENCES "hashtags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "corrections" ADD CONSTRAINT "corrections_essay_id_fkey" FOREIGN KEY ("essay_id") REFERENCES "essays"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "corrections" ADD CONSTRAINT "corrections_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "correction_sentences" ADD CONSTRAINT "correction_sentences_id_correction_fkey" FOREIGN KEY ("id_correction") REFERENCES "corrections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "correction_replies" ADD CONSTRAINT "correction_replies_correction_id_fkey" FOREIGN KEY ("correction_id") REFERENCES "corrections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "correction_replies" ADD CONSTRAINT "correction_replies_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
