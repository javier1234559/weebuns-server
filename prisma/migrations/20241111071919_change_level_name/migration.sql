/*
  Warnings:

  - The `current_level` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `level` on the `courses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CerfLevel" AS ENUM ('a1', 'a2', 'b1', 'b2', 'c1', 'c2');

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "level",
ADD COLUMN     "level" "CerfLevel" NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "current_level",
ADD COLUMN     "current_level" "CerfLevel" NOT NULL DEFAULT 'a1';

-- DropEnum
DROP TYPE "CefrLevel";
