/*
  Warnings:

  - The `tags` column on the `notes` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tags` column on the `vocabularies` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "notes" DROP COLUMN "tags",
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "vocabularies" DROP COLUMN "tags",
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
