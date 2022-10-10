-- AlterTable
ALTER TABLE "bookings" ALTER COLUMN "return_date" DROP NOT NULL,
ALTER COLUMN "return_date" DROP DEFAULT;
