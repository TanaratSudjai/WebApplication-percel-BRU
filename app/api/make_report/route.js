import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

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
      where: {
        pickupsdate: {
          gte: today, 
          lt: tomorrow, 
        },
      },
    });

    const parcelsWithPhone = dataParcel.map((parcel) => {
      return {
        ...parcel,
        own_name: parcel.Owner?.own_name,
        own_phone: parcel.Owner?.own_phone,
        ownertype_name: parcel.Owner?.ownertype?.ownertype_name,
        staff_name: parcel.Staff?.staff_name,
        sta_name: parcel.Status?.sta_name,
        com_name: parcel.Company?.com_name,
        categoryparcel_name: parcel.CategoryParcel?.categoryparcel_name,
      };
    });

    console.table(parcelsWithPhone);

    return Response.json({ dataParcel: parcelsWithPhone }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
