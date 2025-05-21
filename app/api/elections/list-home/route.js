import { NextResponse } from "next/server";
import { getElectionsHome } from "@/controllers/electionsController";

export const GET = async () => {
  const result = await getElectionsHome();

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
};
