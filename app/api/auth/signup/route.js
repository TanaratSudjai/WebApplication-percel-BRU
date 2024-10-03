import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const account = await prisma.staff.findMany();
    return Response.json({
      account,
    });
  } catch (err) {
    return Response.json(
      {
        err: err.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req) {
  try {
    const { staff_name,staff_phone, email, password } = await req.json();
    const hashedpassword = await bcrypt.hashSync(password, 10);
    const accout = await prisma.staff.create({
      data: {
        staff_name,
        staff_phone,
        email,
        password: hashedpassword,
      },
    });
    return Response.json({
      message: "Add accout into database",
      data: {
        accout,
      },
    });
  } catch (error) {
    return Response.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
