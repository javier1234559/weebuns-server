/*
  Warnings:

  - You are about to drop the column `reviews` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `comments` on the `units` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "courses" DROP COLUMN "reviews",
ALTER COLUMN "price" DROP NOT NULL;

-- AlterTable
ALTER TABLE "units" DROP COLUMN "comments";

-- AlterTable
ALTER TABLE "user_courses" ADD COLUMN     "completed_weight" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "payment_status" DROP DEFAULT,
ALTER COLUMN "purchase_price" DROP NOT NULL;

-- CreateTable
CREATE TABLE "unit_comments" (
    "id" TEXT NOT NULL,
    "unit_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "unit_comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "unit_comments_unit_id_idx" ON "unit_comments"("unit_id");

-- CreateIndex
CREATE INDEX "unit_comments_created_by_idx" ON "unit_comments"("created_by");

-- CreateIndex
CREATE INDEX "correction_replies_correction_id_idx" ON "correction_replies"("correction_id");

-- CreateIndex
CREATE INDEX "correction_replies_created_by_idx" ON "correction_replies"("created_by");

-- CreateIndex
CREATE INDEX "correction_sentences_correction_id_index_idx" ON "correction_sentences"("correction_id", "index");

-- CreateIndex
CREATE INDEX "corrections_essay_id_idx" ON "corrections"("essay_id");

-- CreateIndex
CREATE INDEX "corrections_created_by_idx" ON "corrections"("created_by");

-- CreateIndex
CREATE INDEX "courses_created_by_idx" ON "courses"("created_by");

-- CreateIndex
CREATE INDEX "essays_space_id_idx" ON "essays"("space_id");

-- CreateIndex
CREATE INDEX "essays_created_by_idx" ON "essays"("created_by");

-- CreateIndex
CREATE INDEX "hashtags_name_idx" ON "hashtags"("name");

-- CreateIndex
CREATE INDEX "hashtags_usage_count_idx" ON "hashtags"("usage_count");

-- CreateIndex
CREATE INDEX "notes_space_id_idx" ON "notes"("space_id");

-- CreateIndex
CREATE INDEX "notes_unit_id_idx" ON "notes"("unit_id");

-- CreateIndex
CREATE INDEX "notes_created_by_idx" ON "notes"("created_by");

-- CreateIndex
CREATE INDEX "notes_is_bookmarked_idx" ON "notes"("is_bookmarked");

-- CreateIndex
CREATE INDEX "space_courses_space_id_idx" ON "space_courses"("space_id");

-- CreateIndex
CREATE INDEX "space_courses_course_id_idx" ON "space_courses"("course_id");

-- CreateIndex
CREATE INDEX "spaces_created_by_idx" ON "spaces"("created_by");

-- CreateIndex
CREATE INDEX "spaces_language_target_idx" ON "spaces"("language", "target");

-- CreateIndex
CREATE INDEX "unit_contents_unit_id_order_index_idx" ON "unit_contents"("unit_id", "order_index");

-- CreateIndex
CREATE INDEX "unit_contents_unit_id_is_premium_idx" ON "unit_contents"("unit_id", "is_premium");

-- CreateIndex
CREATE INDEX "units_course_id_order_index_idx" ON "units"("course_id", "order_index");

-- CreateIndex
CREATE INDEX "vocabularies_space_id_idx" ON "vocabularies"("space_id");

-- CreateIndex
CREATE INDEX "vocabularies_created_by_idx" ON "vocabularies"("created_by");

-- CreateIndex
CREATE INDEX "vocabularies_next_review_idx" ON "vocabularies"("next_review");

-- AddForeignKey
ALTER TABLE "unit_comments" ADD CONSTRAINT "unit_comments_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unit_comments" ADD CONSTRAINT "unit_comments_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
