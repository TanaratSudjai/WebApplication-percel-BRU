import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const dataParcel = await prisma.parcel.findMany({
      include: {
        Owner: true,
        Staff: true,
        Status: true, // ระบุให้รวมข้อมูลจาก relation Owner
      },
    });

    const parcelsWithPhone = dataParcel.map((parcel) => {
      return {
        ...parcel,
        own_phone: parcel.Owner && parcel.Owner.own_phone,
        staff_name: parcel.Staff && parcel.Staff.staff_name,
        sta_name: parcel.Status && parcel.Status.sta_name
      };
    });

    // console.table(parcelsWithPhone);

    return Response.json({ dataParcel:parcelsWithPhone }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const date = new Date();
    const status = 1;
    const { Rid, owner, staff } = await req.json();
    // console.table({ Rid, owner, staff });
    const newParcel = await prisma.parcel.create({
      data: {
        par_real_id: Rid,
        own_id: owner,
        staff_id: staff,
        sta_id: status,
        pickupsdate: date,
      },
    });

    return Response.json(
      {
        newParcel,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(
      {
        error,
      },
      {
        status: 500,
      }
    );
  }
}
