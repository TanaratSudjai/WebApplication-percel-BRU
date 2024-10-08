-- CreateTable
CREATE TABLE "staff" (
    "id" SERIAL NOT NULL,
    "staff_name" TEXT,
    "staff_phone" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "owner" (
    "own_id" SERIAL NOT NULL,
    "own_name" TEXT NOT NULL,
    "own_phone" TEXT NOT NULL,
    "ownertype_id" INTEGER NOT NULL,

    CONSTRAINT "owner_pkey" PRIMARY KEY ("own_id")
);

-- CreateTable
CREATE TABLE "ownertype" (
    "ownertype_id" SERIAL NOT NULL,
    "ownertype_name" TEXT NOT NULL,

    CONSTRAINT "ownertype_pkey" PRIMARY KEY ("ownertype_id")
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
    "parcel_category_id" INTEGER,
    "own_id" INTEGER,
    "staff_id" INTEGER,
    "pickupsdate" TIMESTAMP(3),
    "sta_id" INTEGER,
    "com_id" INTEGER,

    CONSTRAINT "parcel_pkey" PRIMARY KEY ("par_id")
);

-- CreateTable
CREATE TABLE "categoryparcel" (
    "parcel_category_id" SERIAL NOT NULL,
    "categoryparcel_name" TEXT NOT NULL,

    CONSTRAINT "categoryparcel_pkey" PRIMARY KEY ("parcel_category_id")
);

-- CreateTable
CREATE TABLE "company" (
    "com_id" SERIAL NOT NULL,
    "com_name" TEXT,

    CONSTRAINT "company_pkey" PRIMARY KEY ("com_id")
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
CREATE UNIQUE INDEX "staff_email_key" ON "staff"("email");

-- CreateIndex
CREATE UNIQUE INDEX "owner_own_phone_key" ON "owner"("own_phone");

-- CreateIndex
CREATE UNIQUE INDEX "company_com_name_key" ON "company"("com_name");

-- CreateIndex
CREATE UNIQUE INDEX "delivered_par_id_key" ON "delivered"("par_id");

-- AddForeignKey
ALTER TABLE "owner" ADD CONSTRAINT "owner_ownertype_id_fkey" FOREIGN KEY ("ownertype_id") REFERENCES "ownertype"("ownertype_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parcel" ADD CONSTRAINT "parcel_com_id_fkey" FOREIGN KEY ("com_id") REFERENCES "company"("com_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parcel" ADD CONSTRAINT "parcel_own_id_fkey" FOREIGN KEY ("own_id") REFERENCES "owner"("own_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parcel" ADD CONSTRAINT "parcel_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parcel" ADD CONSTRAINT "parcel_sta_id_fkey" FOREIGN KEY ("sta_id") REFERENCES "status"("sta_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parcel" ADD CONSTRAINT "parcel_parcel_category_id_fkey" FOREIGN KEY ("parcel_category_id") REFERENCES "categoryparcel"("parcel_category_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivered" ADD CONSTRAINT "delivered_par_id_fkey" FOREIGN KEY ("par_id") REFERENCES "parcel"("par_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivered" ADD CONSTRAINT "delivered_own_id_fkey" FOREIGN KEY ("own_id") REFERENCES "owner"("own_id") ON DELETE SET NULL ON UPDATE CASCADE;
