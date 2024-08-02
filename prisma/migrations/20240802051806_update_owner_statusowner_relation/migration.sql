/*
  Warnings:

  - Added the required column `owner_status_id` to the `owner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "owner" ADD COLUMN     "owner_status_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Statusowner" (
    "owner_status_id" SERIAL NOT NULL,
    "owner_status_name" TEXT NOT NULL,

    CONSTRAINT "Statusowner_pkey" PRIMARY KEY ("owner_status_id")
);

-- AddForeignKey
ALTER TABLE "owner" ADD CONSTRAINT "owner_owner_status_id_fkey" FOREIGN KEY ("owner_status_id") REFERENCES "Statusowner"("owner_status_id") ON DELETE RESTRICT ON UPDATE CASCADE;
