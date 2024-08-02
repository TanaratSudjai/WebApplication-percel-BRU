import { Prisma, PrismaClient } from "@prisma/client";
import { Message } from "twilio/lib/twiml/MessagingResponse";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const dataparcel_category = await prisma.categoryParcel.findMany();
    return Response.json({ dataparcel_category }, { status: 200 });
  } catch (err) {
    return Response.json({ err: Message }, { status: 500 });
  }
}

export async function POST(req, res) {
  try {
    const {name} = await req.json();
    const newcategory = await prisma.categoryParcel.create({
      data: {
        caategoryparcel_name: name,
      },
    });
    return Response.json({ newcategory }, { status: 200 });
  } catch (err) {
    return Response.json({ err: Message }, { status: 500 });
  }
}
