import { NextResponse } from 'next/server';
import { createElection } from '@/controllers/electionsController';
import { authMiddleware } from '@/middleware/authMiddleware';

export const POST = authMiddleware(async (request) => {
  try {
    const formData = await request.formData();

    const title = formData.get('title');
    const type = formData.get('type');
    const eligibilityId = formData.get('eligibilityId');
    const startDate = formData.get('startDate');
    const endDate = formData.get('endDate');

    let candidatesData = [];
    try {
      const candidatesRaw = formData.get('candidates');
      candidatesData = candidatesRaw ? JSON.parse(candidatesRaw) : [];
    } catch (error) {
      console.error('Gagal parse candidates:', error);
      return NextResponse.json(
        { message: 'Format data candidates tidak valid.' },
        { status: 400 }
      );
    }

    const candidateImages = [];
    for (let i = 0; i < candidatesData.length; i++) {
      const image = formData.get(`candidateImage${i + 1}`);
      if (image) {
        candidateImages.push({ index: i, image });
      }
    }

    const electionData = {
      title,
      type,
      eligibilityId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      candidates: candidatesData,
      candidateImages,
    };

    const result = await createElection(electionData);

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
  } catch (error) {
    console.error('Error di POST /api/elections/create:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan di server.' },
      { status: 500 }
    );
  }
});
