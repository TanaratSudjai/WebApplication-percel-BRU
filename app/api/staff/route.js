import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const staff = await prisma.staff.findMany()

    console.log(staff);

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
    const { name, phone } = req.json();
    console.table({ name, phone });
    const newStaff = await prisma.staff.create({
      data: {
        staff_name: name,
        staff_phone: phone,
      },
    });
    return Response.json({ message: "POST Api Staff !", newStaff });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
