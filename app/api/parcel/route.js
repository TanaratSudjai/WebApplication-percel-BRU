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
    const { real_id, owner, staff, status } = await  req.json();

    const newParcel = await prisma.parcel.create({
      data:{
        par_real_id: real_id,
        own_id: owner,
        staff_id: staff,
        sta_id: status,
        pickupsdate:date,
      }
    });

    return Response.json(
      {
        newParcel,
      },
      {
        status:200
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
