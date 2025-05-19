import { NextResponse } from "next/server";
import { editProfileUser } from "@/controllers/usersController";
import { authMiddleware } from "@/middleware/authMiddleware";

export const PATCH = authMiddleware(async (request) => {
  const userId = request.user.id;
  const body = await request.json();

  const result = await editProfileUser(userId, body);

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
