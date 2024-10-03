import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const typedata = await prisma.ownertype.findMany();
    return Response.json({ typedata });
  } catch (err) {
    return Response.json({ massage: err }, { status: 500 });
  }
}

export async function POST(req, res) {
  try {
    const { name } = await req.json();
    const newtypeowner = await prisma.ownertype.create({
      data: {
        ownertype_name: name,
      },
    });
    return Response.json({ newtypeowner }, { status: 200 });
  } catch (err) {
    return Response.json({ massage: err }, { status: 500 });
  }
}
