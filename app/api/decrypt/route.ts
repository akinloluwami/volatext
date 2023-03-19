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
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" });
  }
}
