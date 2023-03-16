import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {
  const code = params.code;
  return NextResponse.json({ hi: "Hello" });
}
