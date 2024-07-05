import { PrismaClient } from "@prisma/client";
import { data } from "autoprefixer";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const id = Number(params.id);
    const datacompany = await prisma.company.findUnique({
      where: {
        com_id: id,
      },
    });

    return Response.json({ datacompany }, { status: 200 });
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

export async function PUT(req, { params }) {
  try {
    const id = Number(params.id);
    const { namecompany } = await req.json();
    const updatecompany = await prisma.company.update({
      where: {
        com_id: id,
      },
      data: {
        com_name: namecompany,
      },
    });
    return Response.json({ updatecompany }, { status: 200 });

  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
