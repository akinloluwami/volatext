import prisma from "../../../prisma/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    prisma.$connect();
    const Text = await prisma.text.create({
      data: {
        expiry_time: new Date(),
        text: "aaaaaaaaaaaaa",
        sharing_code: "2222",
      },
    });

    return NextResponse.json({ message: "Success", Text });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", error });
  }
}
