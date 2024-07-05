import { PrismaClient } from "@prisma/client";
import { data } from "autoprefixer";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const datacompany = await prisma.company.findMany();

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

export async function POST(req, { params }) {
  try {
    const { namecompany } = await req.json();

    const newCompany = await prisma.company.create({
      data: {
        com_name: namecompany,
      },
    });

    return Response.json({ newCompany }, { status: 200 });
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
