import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET() {
  try {
    const personnel = await prisma.parcel.findMany({
      where: {
        Owner: {
          ownertype_id: 2,
        },
      },
      include: {
        Staff: true,
        Company: true,
        Status: true,
        CategoryParcel: true,
        Owner:{
            include:{
                ownertype:true
            }
        }
      },
    });

    const personnels = personnel.map((parcel) => {
      return {
        par_real_id : parcel.par_real_id,
        par_name: parcel.par_name,
        own_name: parcel.Owner?.own_name,
        own_phone: parcel.Owner?.own_phone,
        ownertype_name: parcel.Owner?.ownertype?.ownertype_name,
        staff_name: parcel.Staff?.staff_name,
        sta_name: parcel.Status?.sta_name,
        com_name: parcel.Company?.com_name,
        categoryparcel_name: parcel.CategoryParcel?.categoryparcel_name,
        pickupsdate : parcel.pickupsdate
      };
    });

    return Response.json({ personnel: personnels });
  } catch (err) {
    return Response.json({ massage: err }, { status: 500 });
  }
}
