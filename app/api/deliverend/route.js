import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const dataDelivernd = await prisma.delivered.findMany();
    console.table(dataDelivernd);

    const owners = await prisma.owner.findMany();

    // สร้าง queryDeli โดยรวมข้อมูลจาก owner
    const queryDeli = dataDelivernd.map(delivered => ({
      ...delivered, // ต้องเป็น delivered ไม่ใช่ dataDelivernd
      own_name: owners.find(owner => owner.own_id === delivered.own_id)?.own_name,
    }));

    return Response.json({ dataDelivernd:queryDeli }, { status: 200 });
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

export async function POST(req) {
  try {
    const date = new Date();
    const { parcelID, ownerID, deliver_name } = await req.json();
    console.table({ parcelID, ownerID, deliver_name });
    const newDelivered = await prisma.delivered.create({
      data: {
        par_id: parcelID,
        own_id: ownerID,
        deliverydate: date,
        deliver_name: deliver_name,
      },
    });

    return Response.json(
      {
        newDelivered,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
