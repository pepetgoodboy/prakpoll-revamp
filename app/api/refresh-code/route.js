import { refreshCode } from "@/controllers/usersController";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (key !== process.env.CRON_SECRET_KEY) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const result = await refreshCode();

  return NextResponse.json(
    { message: result.message },
    { status: result.status }
  );
}
