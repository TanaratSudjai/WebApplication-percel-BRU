import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const today = new Date();
    const dataParcel = await prisma.parcel.findMany({
      include: {
        Owner: {
          include: {
            ownertype: true,
          },
        },

        Staff: true,
        Company: true,
        Status: true,
        CategoryParcel: true,
      },
      orderBy: {
        par_id: "desc",
      },
      where:{
        pickupsdate:today
      }
    });

    const parcelsWithPhone = dataParcel.map((parcel) => {
      return {
        ...parcel,
        own_name: parcel.Owner && parcel.Owner.own_name,
        own_phone: parcel.Owner && parcel.Owner.own_phone,
        ownertype_name: parcel.Owner?.ownertype?.ownertype_name,
        staff_name: parcel.Staff && parcel.Staff.staff_name,
        sta_name: parcel.Status && parcel.Status.sta_name,
        com_name: parcel.Company && parcel.Company.com_name,
        caategoryparcel_name:
          parcel.CategoryParcel && parcel.CategoryParcel.categoryparcel_name,
      };
    });

    //console.table(parcelsWithPhone);

    return Response.json({ dataParcel: parcelsWithPhone }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}