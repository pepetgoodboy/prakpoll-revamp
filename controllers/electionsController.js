import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

// Get All Elections
const getAllElections = async () => {
  try {
    const elections = await prisma.elections.findMany({
      include: {
        candidates: true,
      },
    });
    return {
      message: `Berhasil mengambil data ${elections.length} pemilihan`,
      status: 200,
      data: elections,
    };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
};

// Get 3 Election Home
const getElectionsHome = async () => {
  try {
    const elections = await prisma.elections.findMany({
      take: 3,
      include: {
        candidates: true,
      },
    });
    return {
      message: `Berhasil mengambil data ${elections.length} pemilihan`,
      status: 200,
      data: elections,
    };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
};

// Get Elections by ID
const getElectionsById = async (id) => {
  try {
    const election = await prisma.elections.findUnique({
      where: {
        id,
      },
      include: {
        candidates: true,
      },
    });
    return {
      message: "Berhasil mengambil data pemilihan",
      data: election,
      status: 200,
    };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
};

// Get Elections by Study Program or UKM
const getElectionsByStudyProgramOrUKM = async (studyProgramOrPosition, ukm) => {
  try {
    // Check if ukm is null & studyProgramOrPosition is Dosen, Akademik, or Staff
    if (
      ukm === "Tidak_Ada" &&
      (studyProgramOrPosition === "Dosen" ||
        studyProgramOrPosition === "Akademik" ||
        studyProgramOrPosition === "Staff")
    ) {
      const elections = await prisma.elections.findMany({
        where: {
          eligibility: "All",
        },
        include: {
          candidates: true,
        },
      });
      return {
        message: "Berhasil mengambil data pemilihan",
        data: elections,
        status: 200,
      };
    }

    // Check if ukm is null
    if (ukm === "Tidak_Ada") {
      const elections = await prisma.elections.findMany({
        where: {
          OR: [{ eligibility: studyProgramOrPosition }, { eligibility: "All" }],
        },
        include: {
          candidates: true,
        },
      });
      return {
        message: "Berhasil mengambil data pemilihan",
        data: elections,
        status: 200,
      };
    }

    const elections = await prisma.elections.findMany({
      where: {
        OR: [
          { eligibility: studyProgramOrPosition },
          { eligibility: ukm },
          { eligibility: "All" },
        ],
      },
      include: {
        candidates: true,
      },
    });
    return {
      message: "Berhasil mengambil data pemilihan",
      data: elections,
      status: 200,
    };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
};

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function upload image to cloudinary
const uploadToCloudinary = async (file) => {
  try {
    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64String = `data:${file.type};base64,${buffer.toString(
      "base64"
    )}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64String, {
      folder: "prakpoll",
      use_filename: true,
    });

    return result.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Image upload failed");
  }
};

// Create Election
const createElection = async (body) => {
  const {
    title,
    type,
    eligibility,
    startDate,
    endDate,
    candidates,
    candidateImages,
  } = body;

  try {
    // Validate if required fields are present
    if (!title || !type || !eligibility || !startDate || !endDate) {
      return { message: "Semua baris wajib diisi", status: 400 };
    }

    if (!candidates || candidates.length <= 1) {
      return { message: "Minimal dua kandidat", status: 400 };
    }

    if (startDate > endDate || endDate < startDate) {
      return { message: "Tanggal pemilihan tidak valid", status: 400 };
    }

    const candidatesWithImages = [...candidates];

    // Upload images to Cloudinary and update URLs
    for (const candidateImage of candidateImages) {
      const { index, image } = candidateImage;

      if (index >= 0 && index < candidatesWithImages.length) {
        const imageUrl = await uploadToCloudinary(image);

        // Update URL
        candidatesWithImages[index].image = imageUrl;
      }
    }

    // Create election with transaction
    const election = await prisma.$transaction(async (tx) => {
      const newElection = await tx.elections.create({
        data: {
          title,
          type,
          eligibility,
          startDate,
          endDate,
          candidates: {
            create: candidatesWithImages.map((candidate) => ({
              name: candidate.name,
              vision: candidate.vision,
              mission: candidate.mission,
              image: candidate.image || "",
            })),
          },
        },
        include: {
          candidates: true,
        },
      });

      return newElection;
    });

    return {
      message: "Berhasil menambahkan pemilihan",
      status: 201,
    };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
};

// Delete Election
const deleteElection = async (id) => {
  try {
    // Find election by id and check if it exists
    const election = await prisma.elections.findUnique({
      where: {
        id,
      },
      select: {
        candidates: {
          select: {
            image: true,
          },
        },
      },
    });

    if (!election) {
      return { status: 404, message: "Pemilihan tidak ditemukan!" };
    }

    // Delete images from Cloudinary
    for (const candidate of election.candidates) {
      if (candidate.image !== null) {
        const image = candidate.image;
        const publicId = image
          .split("/")
          .slice(-2)
          .join("/")
          .replace(/\.[^.]+$/, "");
        await cloudinary.uploader.destroy(publicId);
      }
    }

    // Delete election from DB
    await prisma.elections.delete({
      where: {
        id,
      },
    });

    return { message: "Berhasil menghapus pemilihan", status: 200 };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
};

const getElectionResult = async (id) => {
  try {
    const election = await prisma.elections.findUnique({
      where: {
        id,
      },
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
          },
        },
      },
    });

    // Total votes
    const totalVotes = election.candidates.reduce(
      (total, candidate) => total + candidate.voteCount,
      0
    );

    // Candidates
    const candidates = election.candidates.map((candidate) => ({
      name: candidate.name,
      voteCount: candidate.voteCount,
      percentage: ((candidate.voteCount / totalVotes) * 100).toFixed(2) + "%",
    }));

    // Total Voters
    let totalVoters = 0;
    if (election.type === "UKM") {
      totalVoters = await prisma.users.count({
        where: {
          ukm: election.eligibility,
          role: "User",
        },
      });
    } else if (election.type === "Himpunan") {
      totalVoters = await prisma.users.count({
        where: {
          studyProgramOrPosition: election.eligibility,
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

    // Result
    const result = {
      title: election.title,
      type: election.type,
      eligibility: election.eligibility,
      startDate: election.startDate,
      endDate: election.endDate,
      totalVotes,
      totalVoters,
      participationRate,
      candidates,
    };

    return {
      message: "Berhasil mengambil data pemilihan",
      data: result,
      status: 200,
    };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
};

const getElectionResultAdmin = async (id) => {
  try {
    const election = await prisma.elections.findUnique({
      where: {
        id,
      },
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

    // Total votes
    const totalVotes = election.candidates.reduce(
      (total, candidate) => total + candidate.voteCount,
      0
    );

    // Candidates
    const candidates = election.candidates.map((candidate) => ({
      name: candidate.name,
      voteCount: candidate.voteCount,
      percentage: ((candidate.voteCount / totalVotes) * 100).toFixed(2) + "%",
      votes: candidate.votes.map((vote) => ({
        userId: vote.userId,
        fullname: vote.user?.fullname ?? "-",
        voteAt: vote.voteAt,
      })),
    }));

    // Total Voters
    let totalVoters = 0;
    if (election.type === "UKM") {
      totalVoters = await prisma.users.count({
        where: {
          ukm: election.eligibility,
          role: "User",
        },
      });
    } else if (election.type === "Himpunan") {
      totalVoters = await prisma.users.count({
        where: {
          studyProgramOrPosition: election.eligibility,
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

    // Users not voted with eligibility filter
    let whereClause = {
      role: "User",
      votes: {
        none: {
          electionId: id,
        },
      },
    };

    if (election.type === "UKM") {
      whereClause.ukm = election.eligibility;
    } else if (election.type === "Himpunan") {
      whereClause.studyProgramOrPosition = election.eligibility;
    }

    const usersNotVoted = await prisma.users.findMany({
      where: whereClause,
      select: {
        npm: true,
        fullname: true,
      },
    });

    // Result
    const result = {
      title: election.title,
      type: election.type,
      eligibility: election.eligibility,
      startDate: election.startDate,
      endDate: election.endDate,
      totalVotes,
      totalVoters,
      participationRate,
      candidates,
      usersNotVoted,
    };

    return {
      message: "Berhasil mengambil data pemilihan",
      data: result,
      status: 200,
    };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
};

export {
  getAllElections,
  getElectionsHome,
  getElectionsById,
  getElectionsByStudyProgramOrUKM,
  createElection,
  deleteElection,
  getElectionResult,
  getElectionResultAdmin,
};
