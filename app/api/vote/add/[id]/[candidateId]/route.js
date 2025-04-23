import { NextResponse } from "next/server";
import { addVote } from "@/controllers/voteController";
import { authMiddleware } from "@/middleware/authMiddleware";

export const POST = authMiddleware(async (request, params) => {
  const id = params.id;
  const candidateId = params.candidateId;
  const userId = request.user.id;

  const result = await addVote(id, candidateId, userId);

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
