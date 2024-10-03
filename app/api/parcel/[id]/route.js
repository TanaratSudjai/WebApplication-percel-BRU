import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const id = Number(params.id);
    const parcel = await prisma.parcel.findUnique({
      where: {
        par_id: id,
      },
    });
    return Response.json({
      parcel,
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
    const deleteParcel = await prisma.parcel.delete({ where: { par_id: id } });
    return Response.json(
      { message: "Api delete parcel Successfully", deleteParcel },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const id = Number(params.id);

    const { real_id, owner, staff, com_id, status } = await req.json();

    const updateParcel = await prisma.parcel.update({
      where: { par_id: id },
      data: {
        par_real_id: real_id,
        own_id: owner,
        staff_id: staff,
        sta_id: status,
        com_id: com_id,
      },
    });
    return Response.json({
      message: "Api update Parcel Status 200 Ok ",
      updateParcel,
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

export async function PATCH(req, { params }) {
  try {
    const id = Number(params.id);
    const status = 2;
    const updateParcel = await prisma.parcel.update({
      where: { par_id: id },
      data: {
        sta_id: status,
      },
    });
    return Response.json({
      message: "Api update Parcel Status 200 Ok ",
      updateParcel,
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
