/*
  Warnings:

  - Added the required column `created_by` to the `units` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "units" ADD COLUMN     "created_by" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "units_created_by_idx" ON "units"("created_by");

-- AddForeignKey
ALTER TABLE "units" ADD CONSTRAINT "units_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
