import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  const { phone, numberotp } = await request.json();

  try {
    const validOTP = await prisma.otp.findFirst({
      where: {
        phone,
        code: numberotp,
        expiresAt: { gt: new Date() },
      },
    });

    if (validOTP) {
      return NextResponse.json({ message: "OTP verified successfully" });
    } else {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to verify OTP" },
      { status: 500 }
    );
  }
}
