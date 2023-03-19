import prisma from "@/prisma/prisma";
import cryptr from "@/utils/cryptr";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { code: string; password: string } }
) {
  try {
    const { code, password } = params;
    if (!code || !password) {
      return NextResponse.json({
        message: "Sharing code and password are required",
      });
    }
    const text = await prisma.text.findUnique({
      where: {
        sharing_code: code,
      },
    });
    if (!text) {
      return NextResponse.json({
        message: "Invalid decryption payload",
      });
    }
    const isPasswordCorrect = password === cryptr.decrypt(text.password);

    if (!isPasswordCorrect) {
      return NextResponse.json({
        message: "Invalid decryption payload",
      });
    }
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" });
  }
}
