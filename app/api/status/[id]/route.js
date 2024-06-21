import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const id = Number(params.id);
    const dataStatus = await prisma.status.findUnique({
      where: {
        sta_id: id,
      },
    });
    return Response.json({
      dataStatus,
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
    const deleteStatus = await prisma.status.delete({ where: { sta_id: id } });
    return Response.json(
      { message: "Api delete Status Successfully", deleteStatus },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const id = Number(params.id);
    const { statusName } = req.body;
    console.table({statusName,});

    const updatestatusName = await prisma.status.update({
      where: { sta_id: id },
      data: {
        sta_name: statusName,
      },
    });
    return Response.json({
      message: "Api update Status Status 200 Ok ",
      updatestatusName,
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
