import { NextResponse } from 'next/server';
import { adminMiddleware } from '@/middleware/authMiddleware';
import { getAllStudyOrPosition } from '@/controllers/usersController';

export const GET = adminMiddleware(async (request) => {
  const result = await getAllStudyOrPosition();

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
