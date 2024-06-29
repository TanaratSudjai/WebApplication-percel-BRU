import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const id = Number(params.id);
    const deliveredById = await prisma.delivered.findUnique({
      where: { del_id: id },
    });
    return Response.json({
      deliveredById,
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
    const deletedelivered = await prisma.delivered.delete({
      where: { del_id: id },
    });
    return Response.json(
      { message: "Api delete delivered Successfully", deletedelivered },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}


export async function PUT(req, {params}){
  try{

    const id = Number(params.id);
    const updateStatus = await prisma.delivered.update(
      {
        where:{del_id:id},
        data:{
          sta_id:2
        }
      }
    );

  }catch(error){
    return Response.json(
      {
        error
      },
      {
        status:500
      }
    )
  }
}