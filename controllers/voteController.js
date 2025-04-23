import { prisma } from "@/lib/prisma";
import { checkVoteTime } from "@/middleware/checkVoteTime";

const addVote = async (id, candidateId, userId) => {
  try {
    const election = await prisma.elections.findUnique({
      where: { id },
      select: { startDate: true, endDate: true },
    });

    if (!election) {
      return { message: "Pemilihan tidak ditemukan", status: 404 };
    }

    const timeCheck = checkVoteTime(election);
    if (timeCheck) return timeCheck;

    const existingVote = await prisma.votes.findUnique({
      where: { userId_electionId: { userId, electionId: id } },
    });

    if (existingVote) {
      return { message: "Anda hanya dapat memilih satu kali", status: 400 };
    }

    const candidate = await prisma.candidates.findUnique({
      where: { id: candidateId },
      select: { electionsId: true },
    });

    if (!candidate || candidate.electionsId !== id) {
      return {
        message: "Kandidat tidak valid untuk pemilihan ini",
        status: 400,
      };
    }

    await prisma.$transaction([
      prisma.candidates.update({
        where: { id: candidateId },
        data: { voteCount: { increment: 1 } },
      }),
      prisma.votes.create({
        data: { userId, electionId: id, candidateId },
      }),
    ]);

    return { message: "Berhasil memilih kandidat", status: 201 };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
};

export { addVote };
