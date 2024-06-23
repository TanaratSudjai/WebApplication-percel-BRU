import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const staff = await prisma.staff.findMany();
    return Response.json({
      staff,
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

export async function POST(req) {
  try {
    const { name, phone } = await  req.json();
    console.table({name,phone});
    const newStaff = await prisma.staff.create({
      data: {
        staff_name: name,
        staff_phone: phone,
      },
    });
    return Response.json({ message: "POST Api Staff ", newStaff });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}


// import { Prisma, PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function POST(req) {
//   try {
//     const { username, phone } = await req.json();
//     // const hashedUsername = await bcrypt.hashSync(username, 10);
//     const newStaff = await prisma.staff.create({
//       data: {
//         staff_name: username,
//         staff_phone: phone,
//       },
//     });
//     return Response.json({
//       message: "Add admin into database for Username and Phone!",
//       data: {
//         newStaff,
//       },
//     });
//   } catch (err) {
//     return Response.json(
//       {
//         err,
//       },
//       { status: 500 }
//     );
//   }
// }