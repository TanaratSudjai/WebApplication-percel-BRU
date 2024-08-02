import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const dataParcel = await prisma.parcel.findMany({
      include: {
        Owner: true,
        Staff: true,
        Company: true,
        Status: true,
        CategoryParcel:true,
        Statusowner:true
      },
      orderBy: {
        par_id: "desc",
      },
    });

    const parcelsWithPhone = dataParcel.map((parcel) => {
      return {
        ...parcel,
        own_phone: parcel.Owner && parcel.Owner.own_phone,
        staff_name: parcel.Staff && parcel.Staff.staff_name,
        sta_name: parcel.Status && parcel.Status.sta_name,
        com_name: parcel.Company && parcel.Company.com_name,
        owner_status_name: parcel.Statusowner && parcel.Statusowner.owner_status_name,
        caategoryparcel_name: parcel.CategoryParcel && parcel.CategoryParcel.caategoryparcel_name
      };
    });

    //console.table(parcelsWithPhone);

    return Response.json({ dataParcel: parcelsWithPhone }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const date = new Date();
    const status = 1;
    const { Rid, owner, staff, company, owner_status, category_parcel } = await req.json();
    //console.table({ Rid, owner, staff,company, owner_status,category_parcel});
    const newParcel = await prisma.parcel.create({
      data: {
        par_real_id: Rid,
        own_id: owner,
        staff_id: staff,
        sta_id: status,
        com_id: company,
        pickupsdate: date,
        owner_status_id: owner_status,
        parcel_category_id:category_parcel
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
