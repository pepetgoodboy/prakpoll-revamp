import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

const isProduction = process.env.MODE === "production";

// Create User (Admin Only)
const createUser = async (body) => {
  const { npm } = body;
  try {
    // Check if user already exists
    const user = await prisma.users.findUnique({ where: { npm } });
    if (user) {
      return { message: "User sudah terdaftar", status: 409 };
    }

    // Create user
    await prisma.users.create({
      data: {
        npm,
      },
    });
    return { message: "Berhasil menambahkan user", status: 201 };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
};

// Delete User (Admin Only)
const deleteUser = async (id) => {
  try {
    const deletedUser = await prisma.users.deleteMany({
      where: { id },
    });

    // Check if user not found
    if (deletedUser.count === 0) {
      return { message: "User tidak ditemukan", status: 404 };
    }

    return { message: "Berhasil menghapus user.", status: 200 };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
};

// Get All User (Admin Only)
const getAllUsers = async () => {
  try {
    const users = await prisma.users.findMany({
      where: {
        role: "User",
      },
      select: {
        id: true,
        npm: true,
        fullname: true,
        studyProgramOrPosition: true,
        ukm: true,
      },
    });

    return {
      message: `Berhasil mengambil data ${users.length} user`,
      status: 200,
      data: users,
    };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
};

// Create jwt token
const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Cookie Option
const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
};

// Login
const loginUser = async (body) => {
  const cookieStore = await cookies();
  const { npm, password } = body;
  try {
    // Check if user exists
    const user = await prisma.users.findUnique({ where: { npm } });
    if (!user) {
      return { message: "User tidak terdaftar", status: 404 };
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { message: "Incorrect password", status: 401 };
    }

    // Create and assign token
    const token = createToken(user.id, user.role);
    cookieStore.set("token", token, cookieOptions);

    return {
      message: "Login berhasil",
      token: token,
      status: 200,
    };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
};

// Register User
const registerUser = async (body) => {
  const { npm, fullname, password, studyProgramOrPosition, ukm } = body;
  try {
    // Check if user already exists
    const user = await prisma.users.findUnique({ where: { npm } });
    if (!user) {
      return { message: "NPM tidak terdaftar", status: 404 };
    }
    if (user.password !== null) {
      return { message: "User sudah terdaftar", status: 409 };
    }

    // Check if password is valid
    if (password.length < 8) {
      return { message: "Password minimal 8 karakter", status: 400 };
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Register User
    await prisma.users.update({
      where: { npm },
      data: {
        fullname,
        password: hashedPassword,
        studyProgramOrPosition,
        ukm,
      },
    });

    return { message: "Registrasi berhasil", status: 201 };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
};

const logoutUser = async () => {
  const cookieStore = await cookies();
  try {
    const cookie = cookieStore.get("token");
    if (!cookie) {
      return { message: "Anda belum login", status: 401 };
    }

    cookieStore.delete("token");
    return { message: "Berhasil logout", status: 200 };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
};

// Check Auth
const checkAuth = async () => {
  const cookieStore = await cookies();
  try {
    const token = cookieStore.get("token");

    if (!token) {
      return { message: "Anda belum login", status: 401 };
    }

    // Verify Token
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
    const user = await prisma.users.findFirst({
      where: { id: decoded.id },
      select: { id: true, npm: true, fullname: true, role: true },
    });

    if (!user) {
      return { message: "User tidak ditemukan", status: 404 };
    }

    return { message: "Terautorisasi", status: 200, user: user };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
};

export {
  loginUser,
  registerUser,
  createUser,
  deleteUser,
  getAllUsers,
  checkAuth,
  logoutUser,
};
