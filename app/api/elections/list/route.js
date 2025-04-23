import { NextResponse } from "next/server";
import { authMiddleware } from "@/middleware/authMiddleware";
import { getElectionsByStudyProgramOrUKM } from "@/controllers/electionsController";

export const GET = authMiddleware(async (request) => {
  const { studyProgramOrPosition, ukm } = request.user;
  const result = await getElectionsByStudyProgramOrUKM(
    studyProgramOrPosition,
    ukm
  );

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
