/*
  Warnings:

  - A unique constraint covering the columns `[own_phone]` on the table `owner` will be added. If there are existing duplicate values, this will fail.
  - Made the column `own_phone` on table `owner` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "owner" ALTER COLUMN "own_phone" SET NOT NULL;

-- AlterTable
ALTER TABLE "parcel" ADD COLUMN     "com_id" INTEGER;

-- CreateTable
CREATE TABLE "company" (
    "com_id" SERIAL NOT NULL,
    "com_name" TEXT,

    CONSTRAINT "company_pkey" PRIMARY KEY ("com_id")
);

-- CreateTable
CREATE TABLE "OTP" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OTP_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "company_com_name_key" ON "company"("com_name");

-- CreateIndex
CREATE UNIQUE INDEX "owner_own_phone_key" ON "owner"("own_phone");

-- AddForeignKey
ALTER TABLE "parcel" ADD CONSTRAINT "parcel_com_id_fkey" FOREIGN KEY ("com_id") REFERENCES "company"("com_id") ON DELETE SET NULL ON UPDATE CASCADE;
