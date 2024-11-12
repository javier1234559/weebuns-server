/*
  Warnings:

  - Added the required column `index` to the `correction_sentences` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "correction_sentences" ADD COLUMN     "index" INTEGER NOT NULL;
