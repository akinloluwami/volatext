import prisma from "../../../prisma/prisma";
import { NextResponse } from "next/server";
import dayjs from "dayjs";
import randomstring from "randomstring";

export async function POST(request: Request) {
  try {
    const expiry = dayjs().add(15, "minutes").toDate();
    const Text = await prisma.text.create({
      data: {
        text: "aaaaaaaaaaaaa",
        sharing_code: randomstring.generate(4),
        expiry,
      },
    });

    return NextResponse.json({ message: "Success", Text });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong", error });
  }
}
