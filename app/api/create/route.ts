import prisma from "../../../prisma/prisma";
import { NextResponse } from "next/server";
import dayjs from "dayjs";
import randomstring from "randomstring";
import cryptr from "@/utils/cryptr";

export async function POST(request: Request) {
  try {
    const { text, length, password, isProtected } = await request.json();

    if (!text) {
      return NextResponse.json({ message: "Text is required" });
    }

    if (isProtected && !password) {
      return NextResponse.json({
        message: "Password is require for protected content",
      });
    }

    const expiry = dayjs()
      .add(length || 15, length < 2 ? "minute" : "minutes")
      .toDate();
    const created = dayjs().toDate();

    const encryptedString = cryptr.encrypt(text);

    const Text = await prisma.text.create({
      data: {
        text: encryptedString,
        sharing_code: randomstring.generate(4).toLowerCase(),
        created,
        expiry,
        password: cryptr.encrypt(password),
        isProtected,
      },
    });

    await prisma.create.create({
      data: {
        created,
      },
    });

    return NextResponse.json({ message: "Success", Text });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong", error });
  }
}
