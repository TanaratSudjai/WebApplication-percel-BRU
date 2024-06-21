import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const today = new Date();
    const next14Days = new Date(today);
    next14Days.setDate(today.getDate() + 14);

    const staff = await prisma.staff.findMany();
    const owners = await prisma.owner.findMany();
    const status = await prisma.status.findMany();
    const parcels = await prisma.parcel.findMany(

    //   where: {
    //     pickupsdate: {
    //       gte: today,
    //       lte: next14Days,
    //     },
    //   },
    //   include: {
    //     Owner: true,
    //     Staff: true,
    //     Status: true,
    //     Delivered: true,
    //   },
    // }

    );
    const delivers = await prisma.delivered.findMany();

    return Response.json({
      staff,
      owners,
      status,
      parcels,
      delivers
    });
    
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
