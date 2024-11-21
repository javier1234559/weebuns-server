/*
  Warnings:

  - The `meaning` column on the `vocabularies` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "vocabularies" DROP COLUMN "meaning",
ADD COLUMN     "meaning" TEXT[];
