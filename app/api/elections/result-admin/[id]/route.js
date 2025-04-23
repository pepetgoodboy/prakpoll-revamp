import { NextResponse } from "next/server";
import { getElectionResultAdmin } from "@/controllers/electionsController";
import { adminMiddleware } from "@/middleware/authMiddleware";

export const GET = adminMiddleware(async (request, params) => {
  const id = params.id;
  const result = await getElectionResultAdmin(id);

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
