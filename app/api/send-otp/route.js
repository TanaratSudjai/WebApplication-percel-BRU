import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  const { phone } = await request.json();
  
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await prisma.oTP.create({
      data: {
        phone,
        code: otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    // TODO: ส่ง SMS OTP จริง

    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
