-- AlterTable
ALTER TABLE "corrections" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "spaces" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "vocabularies" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "courses_deleted_at_is_published_idx" ON "courses"("deleted_at", "is_published");

-- CreateIndex
CREATE INDEX "spaces_deleted_at_idx" ON "spaces"("deleted_at");
