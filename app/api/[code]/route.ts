import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { code: string } }
) {
  const code = params.code;

  const text = await prisma.text.findUnique({
    where: { sharing_code: code },
  });

  if (!text) {
    return NextResponse.json({ message: "Text not found" });
  }

  return NextResponse.json({ text });
}
