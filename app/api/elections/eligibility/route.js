import { NextResponse } from 'next/server';
import { getAllEligibility } from '@/controllers/electionsController';
import { authMiddleware } from '@/middleware/authMiddleware';

export const GET = authMiddleware(async (request) => {
  const result = await getAllEligibility();

  if ('error' in result) {
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
