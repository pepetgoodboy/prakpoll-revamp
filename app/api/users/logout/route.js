import { NextResponse } from "next/server";
import { logoutUser } from "@/controllers/usersController";

export async function GET() {
  const result = await logoutUser();

  if ("error" in result) {
    return NextResponse.json(
      { message: result.message },
      { status: result.status }
    );
  }

  return NextResponse.json(
    { message: result.message },
    { status: result.status }
  );
}
