import { NextResponse } from "next/server";
import { authMiddleware } from "@/middleware/authMiddleware";
import { getElectionsById } from "@/controllers/electionsController";

export const GET = authMiddleware(async (request, params) => {
  const id = params.id;
  const result = await getElectionsById(id);

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
