import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const id = Number(params.id);
    const staffById = await prisma.staff.findUnique({ where: { staff_id:id } });
    return Response.json({
      staffById,
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

export async function DELETE(req, { params }) {
  try {
    const id = Number(params.id);
    const deleteStaff = await prisma.staff.delete({ where: { staff_id: id } });
    return Response.json(
      { message: "Api delete Staff Successfully", deleteStaff },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}