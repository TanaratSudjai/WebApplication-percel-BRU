import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const unstatus = 2;
    const dataundeliverend = await prisma.parcel.findMany({
      include: {
        Owner: true,
        Staff: true,
        Company: true,
        Status: true,
        CategoryParcel: true,
      },
      where: {
        sta_id: unstatus,
      },
    });

    const parcelUndeliverend = dataundeliverend.map((parcel) => {
      return {
        ...parcel,
        own_phone: parcel.Owner && parcel.Owner.own_phone,
        staff_name: parcel.Staff && parcel.Staff.staff_name,
        sta_name: parcel.Status && parcel.Status.sta_name,
        com_name: parcel.Company && parcel.Company.com_name,
        caategoryparcel_name:
          parcel.CategoryParcel && parcel.CategoryParcel.caategoryparcel_name,
      };
    });

    return Response.json({ parcelUndeliverend }, { status: 200 });
  } catch (err) {
    return Response.json({ err }, { status: 500 });
  }
}
