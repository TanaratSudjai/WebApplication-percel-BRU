import bcrypt from "bcrypt";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { username, phone } = await req.json();
    const hashedUsername = bcrypt.hashSync(username, 10);
    const newStaff = await prisma.staff.create({
      data: {
        staff_name: hashedUsername,
        staff_phone: phone,
      },
    });
    return Response.json({
      message: "Add admin into database for Username and Phone!",
      data: {
        newStaff,
      },
    });
  } catch (err) {
    return Response.json(
      {
        err,
      },
      { status: 500 }
    );
  }
}
