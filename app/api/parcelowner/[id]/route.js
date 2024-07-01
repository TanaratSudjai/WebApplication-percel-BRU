import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const id_owner = Number(params.id);
    const parcelOwner = await prisma.parcel.findMany({
      where: {
        own_id: id_owner,
      },
      include: {
        Owner: true,
        Staff: true,
        Status: true,
      },
    });

    return Response.json(
      {
        parcelOwner,
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
