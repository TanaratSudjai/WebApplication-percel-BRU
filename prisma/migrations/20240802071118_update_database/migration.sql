/*
  Warnings:

  - You are about to drop the `CategoryParcel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "parcel" DROP CONSTRAINT "parcel_parcel_category_id_fkey";

-- DropTable
DROP TABLE "CategoryParcel";

-- CreateTable
CREATE TABLE "categoryparcel" (
    "parcel_category_id" SERIAL NOT NULL,
    "caategoryparcel_name" TEXT NOT NULL,

    CONSTRAINT "categoryparcel_pkey" PRIMARY KEY ("parcel_category_id")
);

-- AddForeignKey
ALTER TABLE "parcel" ADD CONSTRAINT "parcel_parcel_category_id_fkey" FOREIGN KEY ("parcel_category_id") REFERENCES "categoryparcel"("parcel_category_id") ON DELETE SET NULL ON UPDATE CASCADE;
