import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const owners = await prisma.owner.findMany({
      orderBy: {
        own_id: "desc",
      },
      include:{
        ownertype:true
      }
    });
    
    return Response.json({ message: "Get Api Owner !", owners });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name, phone, type } = await req.json();

    const checkphone = await prisma.owner.count({
      where: {
        own_phone: phone,
      },
    });

    if (checkphone == 0) {
      const newOwner = await prisma.owner.create({
        data: {
          own_name: name,
          own_phone: phone,
          ownertype_id: type,
        },
      });
      return Response.json({ message: "POST Api Owner !", newOwner });
    }
    return;
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

//ลบหลายๆ รายการ เพิ่มเติม

// export default async function DELETE(req, res) {
//   try {
//     const { ids } = req.query;

//     if (!ids) {
//       return res.status(400).json({
//         message: "Ids parameter is required!",
//       });
//     }

//     // Split ids by comma and convert to an array of numbers
//     const idArray = ids.split(",").map((id) => Number(id.trim()));

//     if (idArray.some(isNaN)) {
//       return res.status(400).json({
//         message: "All ids must be valid numbers!",
//       });
//     }

//     const dataDeleteInOwner = await prisma.owner.deleteMany({
//       where: {
//         own_id: {
//           in: idArray,
//         },
//       },
//     });

//     return res.status(200).json({
//       message: "Owners deleted successfully!",
//       dataDeleteInOwner,
//     });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// }
