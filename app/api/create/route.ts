import prisma from "../../../prisma/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const Text = await prisma.text.create({
      data: {
        text: "aaaaaaaaaaaaa",
        sharing_code: "2222",
        expiry: new Date(),
      },
    });

    return NextResponse.json({ message: "Success", Text });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong", error });
  }
}
