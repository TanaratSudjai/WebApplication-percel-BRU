import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const dataParcel = await prisma.parcel.findMany();
    return Response.json({ dataParcel }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const date = new Date();
    const status = 1;
    const { Rid, owner, staff } = await req.json();
    console.table({ Rid, owner, staff });
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
