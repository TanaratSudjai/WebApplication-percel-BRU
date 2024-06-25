import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const id = Number(params.id);
    const staffById = await prisma.staff.findUnique({
      where: { id: id },
    });
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
    const deleteStaff = await prisma.staff.delete({ where: {id: id } });
    return Response.json(
      { message: "Api delete Staff Successfully", deleteStaff },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const id = Number(params.id);
    const { staffName, phone } = await req.json();
    console.table({ id, staffName });

    const updatestaffName = await prisma.staff.update({
      where: { staff_id: id },
      data: {
        staff_name: staffName,
        staff_phone: phone,
      },
    });

    return Response.json({
      message: "Api update Staff Status 200 Ok ",
      updatestaffName,
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
