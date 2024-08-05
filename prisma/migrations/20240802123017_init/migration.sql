/*
  Warnings:

  - You are about to drop the column `caategoryparcel_name` on the `categoryparcel` table. All the data in the column will be lost.
  - Added the required column `categoryparcel_name` to the `categoryparcel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categoryparcel" DROP COLUMN "caategoryparcel_name",
ADD COLUMN     "categoryparcel_name" TEXT NOT NULL;
