import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { code: string; password: string } }
) {
  try {
    const { code, password } = params;
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" });
  }
}
