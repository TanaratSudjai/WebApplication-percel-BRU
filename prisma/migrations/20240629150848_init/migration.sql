/*
  Warnings:

  - The primary key for the `staff` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `staff_id` on the `staff` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `staff` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `staff` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "parcel" DROP CONSTRAINT "parcel_staff_id_fkey";

-- DropIndex
DROP INDEX "staff_staff_name_key";

-- AlterTable
ALTER TABLE "staff" DROP CONSTRAINT "staff_pkey",
DROP COLUMN "staff_id",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "staff_name" DROP NOT NULL,
ADD CONSTRAINT "staff_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "staff_email_key" ON "staff"("email");

-- AddForeignKey
ALTER TABLE "parcel" ADD CONSTRAINT "parcel_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;
