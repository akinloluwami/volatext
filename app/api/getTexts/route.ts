import prisma from "../../../prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const texts = await prisma.text.findMany();
    return NextResponse.json({ texts });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", error });
  }
}
