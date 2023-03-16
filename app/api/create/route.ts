import client from "../../../prisma/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    client.$connect();
    const Text = await client.text.create({
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
