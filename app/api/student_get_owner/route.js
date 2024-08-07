import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET() {
  try {
    const student = await prisma.owner.findMany({
      where: {
        ownertype_id: 1,
      },
      include:{
        ownertype:true
      }
    });

    return Response.json({ student });
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
