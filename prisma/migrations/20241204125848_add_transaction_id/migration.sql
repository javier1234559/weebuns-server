-- AlterTable
ALTER TABLE "subscription_payments" ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'VND',
ADD COLUMN     "transaction_id" TEXT;
