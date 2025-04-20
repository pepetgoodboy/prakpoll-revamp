import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

const isProduction = process.env.MODE === "production";

// Create jwt token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
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
    const token = createToken(user.id);
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

export { loginUser, createUser, registerUser };
