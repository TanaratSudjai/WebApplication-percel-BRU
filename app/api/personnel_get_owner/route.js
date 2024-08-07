import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET() {
  try {
    const personnel = await prisma.owner.findMany({
      where: {
        ownertype_id: 2,
      },
      include:{
        ownertype:true
      }
    });

    return Response.json({ personnel });
  } catch (err) {
    return Response.json(
      {
        message: "success get type owner",
      },
      {
        status: 200,
      }
    );
  }
}
