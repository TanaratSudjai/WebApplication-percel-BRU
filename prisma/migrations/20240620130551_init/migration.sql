-- CreateTable
CREATE TABLE "staff" (
    "staff_id" SERIAL NOT NULL,
    "staff_name" TEXT NOT NULL,
    "staff_phone" TEXT,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("staff_id")
);

-- CreateTable
CREATE TABLE "owner" (
    "own_id" SERIAL NOT NULL,
    "own_name" TEXT NOT NULL,
    "own_phone" TEXT,

    CONSTRAINT "owner_pkey" PRIMARY KEY ("own_id")
);

-- CreateTable
CREATE TABLE "status" (
    "sta_id" SERIAL NOT NULL,
    "sta_name" TEXT NOT NULL,

    CONSTRAINT "status_pkey" PRIMARY KEY ("sta_id")
);

-- CreateTable
CREATE TABLE "parcel" (
    "par_id" SERIAL NOT NULL,
    "par_real_id" TEXT NOT NULL,
    "own_id" INTEGER,
    "staff_id" INTEGER,
    "pickupsdate" TIMESTAMP(3),
    "sta_id" INTEGER,

    CONSTRAINT "parcel_pkey" PRIMARY KEY ("par_id")
);

-- CreateTable
CREATE TABLE "delivered" (
    "del_id" SERIAL NOT NULL,
    "par_id" INTEGER,
    "own_id" INTEGER,
    "deliverydate" TIMESTAMP(3),
    "deliver_name" TEXT,

    CONSTRAINT "delivered_pkey" PRIMARY KEY ("del_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "delivered_par_id_key" ON "delivered"("par_id");

-- AddForeignKey
ALTER TABLE "parcel" ADD CONSTRAINT "parcel_own_id_fkey" FOREIGN KEY ("own_id") REFERENCES "owner"("own_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parcel" ADD CONSTRAINT "parcel_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staff"("staff_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parcel" ADD CONSTRAINT "parcel_sta_id_fkey" FOREIGN KEY ("sta_id") REFERENCES "status"("sta_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivered" ADD CONSTRAINT "delivered_par_id_fkey" FOREIGN KEY ("par_id") REFERENCES "parcel"("par_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivered" ADD CONSTRAINT "delivered_own_id_fkey" FOREIGN KEY ("own_id") REFERENCES "owner"("own_id") ON DELETE SET NULL ON UPDATE CASCADE;
