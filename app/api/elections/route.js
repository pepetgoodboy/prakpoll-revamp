import { NextResponse } from "next/server";
import { getAllElections } from "@/controllers/electionsController";
import { adminMiddleware } from "@/middleware/authMiddleware";

export const GET = adminMiddleware(async (request) => {
  const result = await getAllElections();

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
