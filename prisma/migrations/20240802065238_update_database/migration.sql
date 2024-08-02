-- AddForeignKey
ALTER TABLE "parcel" ADD CONSTRAINT "parcel_parcel_category_id_fkey" FOREIGN KEY ("parcel_category_id") REFERENCES "CategoryParcel"("parcel_category_id") ON DELETE SET NULL ON UPDATE CASCADE;
