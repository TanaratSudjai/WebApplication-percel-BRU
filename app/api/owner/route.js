//ลบหลายๆ รายการ เพิ่มเติม
import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



export async function GET(){
   try{
    const owners = await prisma.owner.findMany();
    return Response.json({message:"Get Api Owner !", owners})
   }catch(error){
    return Response.json({error}, {status:500})
   }
}

// export async function DELETE(req, res){
//     try {
        
//       const { ids } = req.query;
//       console.log(ids);
  
//       //เช็ค รายการ id ที่ส่งเข้ามา
//       if (!ids || ids.length === 0) {
//         return res.status(400).json({
//           message: "Ids parameter is required!",
//         });
//       }

//       //map เป็น array
//       const idArray = ids.split(',').map(id => Number(id.trim())); 
//       const dataDeleteInOwner = await prisma.owner.deleteMany({
//         where: {
//           own_id: {
//             in: idArray,
//           },
//         },
//       });
  
//       return Response.json(
//         { message: "Owners deleted successfully!", dataDeleteInOwner },
//         {
//           status: 200,
//         }
//       );
//     } catch (error) {
//       return Response.json({ error }, { status: 500 });
//     }
// }