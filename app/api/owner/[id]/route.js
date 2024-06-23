import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const id = Number(params.id);
    const ownerById = await prisma.owner.findUnique({ where: { own_id: id } });
    return Response.json({
      ownerById,
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
    const deleteOwner = await prisma.owner.delete({ where: { own_id: id } });
    return Response.json(
      { message: "Api delete Owner Successfully", deleteOwner },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function PUT(req, { params }){
  try{
    const id = Number(params.id);
    const { ownerName, phone } = req.json();
    console.table({id ,ownerName , phone});

    const updateOwner = await prisma.owner.update(
      {
        where: {own_id: id},
        data: {
          own_name: ownerName , 
          own_phone: phone 
        }
      }
    )
    return Response.json({
      message:"Api update Owner Status 200 Ok ", updateOwner
    })
  }catch(error){
    return Response.json({
      error
    }, {
      status:500
    })
  }
}


