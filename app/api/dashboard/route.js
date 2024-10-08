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
    const parcels = await prisma.parcel.findMany();
    const delivers = await prisma.delivered.findMany();
    const company = await prisma.company.findMany();

    const updatedParcels = parcels.map(parcel => ({
      ...parcel,
      sta_name:status.find(status => status.sta_id === parcel.sta_id)?.sta_name,
      own_name:owners.find(owner => owner.own_id === parcel.own_id)?.own_name,
      staff_name:staff.find(staff => staff.id === parcel.staff_id)?.staff_name,
      com_name:company.find(company => company.com_id === parcel.com_id)?.com_name,
    }));


    const unitStaff = await prisma.staff.count();
    const unitOwners = await prisma.owner.count();
    const unitParcels = await prisma.parcel.count(
      {
        where:{
          sta_id:1
        }
      }
    );
    const unitParcelsSuccess = await prisma.parcel.count(
      {
        where:{
          sta_id:2
        }
      }
    );

    const sumParcel = await prisma.parcel.count();
    const unitDelivers = await prisma.delivered.count();
    const unitCompany = await prisma.company.count();
    

    // console.table({unitStaff,unitOwners,unitParcels,unitParcelsSuccess, unitDelivers})

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
      sumParcel,
      company,
      unitStaff,
      unitOwners,
      unitParcels,
      unitParcelsSuccess,
      unitDelivers,
      unitCompany
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
