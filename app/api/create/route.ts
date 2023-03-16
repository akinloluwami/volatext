import prisma from "../../../prisma/prisma";
import { NextResponse } from "next/server";
import dayjs from "dayjs";
import randomstring from "randomstring";
import Cryptr from "cryptr";

export async function POST(request: Request) {
  const cryptr = new Cryptr(
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  );

  try {
    const { text } = await request.json();
    const expiry = dayjs().add(15, "minutes").toDate();
    const created = dayjs().toDate();

    const encryptedString = cryptr.encrypt(text);

    const Text = await prisma.text.create({
      data: {
        text: encryptedString,
        sharing_code: randomstring.generate(4).toLowerCase(),
        created,
        expiry,
      },
    });

    return NextResponse.json({ message: "Success", Text });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong", error });
  }
}
