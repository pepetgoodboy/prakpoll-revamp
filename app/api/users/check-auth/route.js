import { NextResponse } from "next/server";
import { checkAuth } from "@/controllers/usersController";

export async function GET() {
  const result = await checkAuth();

  if ("error" in result) {
    return NextResponse.json(
      { message: result.message },
      { status: result.status }
    );
  }

  return NextResponse.json(
    { message: result.message, user: result.user },
    { status: result.status }
  );
}
