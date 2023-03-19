import prisma from "@/prisma/prisma";
import cryptr from "@/utils/cryptr";
import dayjs from "dayjs";
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

  const now = dayjs();
  const expiry = dayjs(text.expiry);

  const diff = expiry.diff(now, "m");

  if (diff < 1) {
    await prisma.text.delete({
      where: { sharing_code: code },
    });
    return NextResponse.json({ message: "Text not found" });
  }

  if (text.isProtected) {
    return NextResponse.json({
      message: text.text.replaceAll("a", "@"),
      isProtected: text.isProtected,
    });
  }

  return NextResponse.json({
    text: cryptr.decrypt(text.text),
    sharing_code: text.sharing_code,
    diff,
    isProtected: text.isProtected,
  });
}
