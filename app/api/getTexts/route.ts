import client from "../../../prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const texts = await client.text.findMany();
  return NextResponse.json(texts);
}
