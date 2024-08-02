import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const { data_status_owner } = await prisma.statusowner.findMany();

    return Response.json({
      data_status_owner,
    });
  } catch (err) {
    Response.json(err);
  }
}

export async function POST(req, res) {
  try {
    const { name } = await req.json();
    const newStatusOwner = await prisma.statusowner.create({
      data: {
        owner_status_name: name,
      },
    });
    return Response.json({ newStatusOwner }, { status: 200 });
  } catch (err) {
    return Response.json({ err }, { status: 500 });
  }
}
