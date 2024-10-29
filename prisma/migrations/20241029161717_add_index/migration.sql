/*
  Warnings:

  - A unique constraint covering the columns `[id_correction,index]` on the table `CorrectionSentence` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `index` to the `CorrectionSentence` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CorrectionSentence" ADD COLUMN     "index" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CorrectionSentence_id_correction_index_key" ON "CorrectionSentence"("id_correction", "index");
