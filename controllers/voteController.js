import { prisma } from "@/lib/prisma";
import { checkVoteTime } from "@/middleware/checkVoteTime";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

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

    const updatedElection = await prisma.elections.findUnique({
      where: { id },
      select: {
        title: true,
        type: true,
        eligibility: true,
        startDate: true,
        endDate: true,
        candidates: {
          select: {
            name: true,
            voteCount: true,
            votes: {
              select: {
                userId: true,
                voteAt: true,
                user: {
                  select: {
                    npm: true,
                    fullname: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const totalVotes = updatedElection.candidates.reduce(
      (total, candidate) => total + candidate.voteCount,
      0
    );

    // Total Voters
    let totalVoters = 0;
    if (updatedElection.type === "UKM") {
      totalVoters = await prisma.users.count({
        where: {
          ukm: updatedElection.eligibility,
          role: "User",
        },
      });
    } else if (updatedElection.type === "Himpunan") {
      totalVoters = await prisma.users.count({
        where: {
          studyProgramOrPosition: updatedElection.eligibility,
          role: "User",
        },
      });
    } else {
      totalVoters = await prisma.users.count({
        where: {
          role: "User",
        },
      });
    }

    // Participation Rate
    const participationRate =
      ((totalVotes / totalVoters) * 100).toFixed(2) + "%";

    const candidates = updatedElection.candidates.map((candidate) => ({
      name: candidate.name,
      voteCount: candidate.voteCount,
      percentage: ((candidate.voteCount / totalVotes) * 100).toFixed(2) + "%",
      votes: candidate.votes.map((vote) => ({
        userId: vote.userId,
        fullname: vote.user?.fullname ?? "-",
        voteAt: vote.voteAt,
      })),
    }));

    // Users not voted with eligibility filter
    let whereClause = {
      role: "User",
      votes: {
        none: {
          electionId: id,
        },
      },
    };

    if (updatedElection.type === "UKM") {
      whereClause.ukm = updatedElection.eligibility;
    } else if (updatedElection.type === "Himpunan") {
      whereClause.studyProgramOrPosition = updatedElection.eligibility;
    }

    const usersNotVoted = await prisma.users.findMany({
      where: whereClause,
      select: {
        npm: true,
        fullname: true,
      },
    });

    const resultUpdatedElection = {
      title: updatedElection.title,
      type: updatedElection.type,
      eligibility: updatedElection.eligibility,
      startDate: updatedElection.startDate,
      endDate: updatedElection.endDate,
      totalVotes,
      totalVoters,
      participationRate,
      candidates,
      usersNotVoted,
    };

    const updatedData = {
      chart: {
        labels: candidates.map((candidate) => candidate.name),
        datasets: [
          {
            label: "Suara",
            data: candidates.map((candidate) => candidate.voteCount),
            backgroundColor: "rgba(78, 71, 228, 0.6)",
            borderColor: "rgba(78, 71, 228, 1)",
            borderWidth: 1,
          },
        ],
      },
      resultUpdatedElection,
    };

    try {
      await pusher.trigger(
        `election-${id}`,
        "update-result-admin",
        updatedData
      );
    } catch (error) {
      console.log(error);
    }

    return { message: "Berhasil memilih kandidat", status: 201 };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
};

export { addVote };
