import { NextResponse } from "next/server";
import { adminMiddleware } from "@/middleware/authMiddleware";
import { getAllUsers } from "@/controllers/usersController";

export const GET = adminMiddleware(async (request) => {
  const result = await getAllUsers();

  if ("error" in result) {
    return NextResponse.json(
      { message: result.message },
      { status: result.status }
    );
  }

  return NextResponse.json(
    { message: result.message, data: result.data },
    { status: result.status }
  );
});
