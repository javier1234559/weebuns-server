/*
  Warnings:

  - You are about to drop the column `current_unit_id` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `is_done` on the `unit_contents` table. All the data in the column will be lost.
  - You are about to drop the `activities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_courses` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SubscriptionType" AS ENUM ('FREE', 'BASIC', 'PREMIUM');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('STRIPE', 'MOMO', 'ZALOPAY');

-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_userId_fkey";

-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_current_unit_id_fkey";

-- DropForeignKey
ALTER TABLE "user_courses" DROP CONSTRAINT "user_courses_course_id_fkey";

-- DropForeignKey
ALTER TABLE "user_courses" DROP CONSTRAINT "user_courses_user_id_fkey";

-- DropIndex
DROP INDEX "courses_topics_idx";

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "current_unit_id";

-- AlterTable
ALTER TABLE "unit_contents" DROP COLUMN "is_done";

-- DropTable
DROP TABLE "activities";

-- DropTable
DROP TABLE "user_courses";

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" "SubscriptionType" NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "correction_balance" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscription_payments" (
    "id" TEXT NOT NULL,
    "subscription_id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "payment_type" "PaymentType" NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "subscription_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "correction_credits" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "payment_id" TEXT,
    "payment_type" "PaymentType" NOT NULL,
    "expire_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "correction_credits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_progress" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "current_unit_id" TEXT,
    "completed_weight" INTEGER NOT NULL DEFAULT 0,
    "last_accessed_at" TIMESTAMP(3),

    CONSTRAINT "course_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unit_progress" (
    "id" TEXT NOT NULL,
    "course_progress_id" TEXT NOT NULL,
    "unit_id" TEXT NOT NULL,
    "completed_weight" INTEGER NOT NULL DEFAULT 0,
    "last_accessed_at" TIMESTAMP(3),
    "is_completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "unit_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unit_content_progress" (
    "id" TEXT NOT NULL,
    "unit_progress_id" TEXT NOT NULL,
    "unit_content_id" TEXT NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "unit_content_progress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "subscriptions_user_id_status_idx" ON "subscriptions"("user_id", "status");

-- CreateIndex
CREATE INDEX "course_progress_last_accessed_at_idx" ON "course_progress"("last_accessed_at");

-- CreateIndex
CREATE UNIQUE INDEX "course_progress_user_id_course_id_key" ON "course_progress"("user_id", "course_id");

-- CreateIndex
CREATE UNIQUE INDEX "unit_progress_course_progress_id_unit_id_key" ON "unit_progress"("course_progress_id", "unit_id");

-- CreateIndex
CREATE UNIQUE INDEX "unit_content_progress_unit_progress_id_unit_content_id_key" ON "unit_content_progress"("unit_progress_id", "unit_content_id");

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription_payments" ADD CONSTRAINT "subscription_payments_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "correction_credits" ADD CONSTRAINT "correction_credits_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_progress" ADD CONSTRAINT "course_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_progress" ADD CONSTRAINT "course_progress_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_progress" ADD CONSTRAINT "course_progress_current_unit_id_fkey" FOREIGN KEY ("current_unit_id") REFERENCES "units"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unit_progress" ADD CONSTRAINT "unit_progress_course_progress_id_fkey" FOREIGN KEY ("course_progress_id") REFERENCES "course_progress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unit_progress" ADD CONSTRAINT "unit_progress_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unit_content_progress" ADD CONSTRAINT "unit_content_progress_unit_progress_id_fkey" FOREIGN KEY ("unit_progress_id") REFERENCES "unit_progress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unit_content_progress" ADD CONSTRAINT "unit_content_progress_unit_content_id_fkey" FOREIGN KEY ("unit_content_id") REFERENCES "unit_contents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
