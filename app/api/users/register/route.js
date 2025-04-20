import { NextResponse } from "next/server";
import { registerUser } from "@/controllers/usersController";

export async function PATCH(request) {
  const body = await request.json();
  const result = await registerUser(body);

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
