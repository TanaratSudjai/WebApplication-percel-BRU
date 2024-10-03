import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(){
    try{
        const dataStatus = await prisma.status.findMany();
        return Response.json({
            dataStatus,
          });
    }catch(error){
        return Response.json({
            error,
          }, {

            status:500
          });
    }
}



export async function POST(req) {
  try {
    const { name } = await req.json();
    const newStatus = await prisma.status.create({
      data: {
        sta_name: name,
      },
    });
    return Response.json({ message: "POST Api Status !", newStatus });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}