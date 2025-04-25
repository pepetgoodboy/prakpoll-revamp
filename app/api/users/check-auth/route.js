import { NextResponse } from "next/server";
import { checkAuth } from "@/controllers/usersController";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  const result = await checkAuth(token?.value);

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
