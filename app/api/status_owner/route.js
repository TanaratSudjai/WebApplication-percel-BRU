import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const data_status_owner = await prisma.statusowner.findMany();

    return Response.json({
      data_status_owner
    });
  } catch (err) {
    Response.json(err);
  }
}
