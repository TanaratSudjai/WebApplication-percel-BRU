/*
  Warnings:

  - A unique constraint covering the columns `[staff_name]` on the table `staff` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "staff_staff_name_key" ON "staff"("staff_name");
