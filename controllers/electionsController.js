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

    if (!candidates || candidates.length === 0) {
      return { message: "Minimal satu kandidat", status: 400 };
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

export { getAllElections, createElection, deleteElection };
