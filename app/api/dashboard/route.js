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
    const parcels = await prisma.parcel.findMany

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
      
      ();
    const delivers = await prisma.delivered.findMany();

    const updatedParcels = parcels.map(parcel => ({
      ...parcel,
      sta_name:status.find(status => status.sta_id === parcel.sta_id)?.sta_name,
      own_name:owners.find(owner => owner.own_id === parcel.own_id)?.own_name,
      staff_name:staff.find(staff => staff.id === parcel.staff_id)?.staff_name,
    }));

    
    // console.table(staff);
    // console.table(owners);
    // console.table(status);
    // console.table(parcels);
    // console.table(delivers);
    
    return Response.json({
      staff,
      owners,
      status,
      parcels:updatedParcels,
      delivers,
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
