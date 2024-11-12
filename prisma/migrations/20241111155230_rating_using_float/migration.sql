/*
  Warnings:

  - You are about to alter the column `rating` on the `correction_sentences` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `rating` on the `corrections` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "correction_sentences" ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "corrections" ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION;
