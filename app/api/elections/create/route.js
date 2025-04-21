import { NextResponse } from "next/server";
import { createElection } from "@/controllers/electionsController";
import { authMiddleware } from "@/middleware/authMiddleware";

export const POST = authMiddleware(async (request) => {
  // Parse data from request
  const formData = await request.formData();

  // Get Data
  const title = formData.get("title");
  const type = formData.get("type");
  const eligibility = formData.get("eligibility");
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");
  const candidatesData = JSON.parse(formData.get("candidates") || "[]");
  const candidateImages = [];

  // Get candidate images
  for (let i = 0; i < candidatesData.length; i++) {
    const image = formData.get(`candidateImage${i + 1}`);
    if (image) {
      candidateImages.push({ index: i, image });
    }
  }

  // Merge data and send to controller
  const electionData = {
    title,
    type,
    eligibility,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    candidates: candidatesData,
    candidateImages,
  };

  const result = await createElection(electionData);

  if ("error" in result) {
    return NextResponse.json(
      { message: result.message },
      { status: result.status }
    );
  }

  return NextResponse.json(
    { message: result.message, data: result.data },
    { status: 201 }
  );
});
