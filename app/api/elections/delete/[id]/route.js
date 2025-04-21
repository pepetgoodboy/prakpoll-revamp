import { NextResponse } from "next/server";
import { adminMiddleware } from "@/middleware/authMiddleware";
import { deleteElection } from "@/controllers/electionsController";

export const DELETE = adminMiddleware(async (request, params) => {
  const id = params.id;

  const result = await deleteElection(id);

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
