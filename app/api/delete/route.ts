import prisma from "@/prisma/prisma";
import dayjs from "dayjs";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const texts = await prisma.text.findMany();

  const expired = texts.filter((text) => {
    const now = dayjs();
    const expiry = dayjs(text.expiry);
    const diff = expiry.diff(now, "m");
    return diff < 1;
  });

  if (expired.length === 0) {
    return NextResponse.json({
      message: "There are no expired messages",
    });
  }

  expired.forEach(async (exp) => {
    await prisma.text.delete({
      where: {
        id: exp.id,
      },
    });
  });

  return NextResponse.json({
    message: `All ${expired.length} expired messages successfully deleted`,
  });
}
