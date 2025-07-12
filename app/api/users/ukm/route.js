import { NextResponse } from 'next/server';
import { authMiddleware } from '@/middleware/authMiddleware';
import { getAllUkm } from '@/controllers/usersController';

export const GET = authMiddleware(async (request) => {
  const result = await getAllUkm();

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
