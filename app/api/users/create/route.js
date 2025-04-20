import { NextResponse } from "next/server";
import { createUser } from "@/controllers/usersController";
import { adminMiddleware } from "@/middleware/authMiddleware";

export const POST = adminMiddleware(async (request) => {
  const body = await request.json();
  const result = await createUser(body);

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
});
