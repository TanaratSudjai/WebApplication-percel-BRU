import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const dataDelivernd = await prisma.delivered.findMany();
    console.table(dataDelivernd);
    return Response.json({ dataDelivernd }, { status: 200 });
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

    const newDeliverend = await prisma.delivered.create({
      data: {
        par_id: parcelID,
        own_id: ownerID,
        deliverydate: date,
        deliver_name: deliver_name,
      },
    });

    return Response.json(
      {
        newDeliverend,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
