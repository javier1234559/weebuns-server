-- DropForeignKey
ALTER TABLE "units" DROP CONSTRAINT "units_created_by_fkey";

-- AlterTable
ALTER TABLE "units" ADD COLUMN     "is_premium" BOOLEAN NOT NULL DEFAULT false;
