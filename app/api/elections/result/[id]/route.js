import { NextResponse } from "next/server";
import { getElectionResult } from "@/controllers/electionsController";
import { authMiddleware } from "@/middleware/authMiddleware";

export const GET = authMiddleware(async (request, params) => {
  const id = params.id;
  const result = await getElectionResult(id);

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
