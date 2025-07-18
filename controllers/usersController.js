import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { ObjectId } from 'mongodb';

const isProduction = process.env.MODE === 'production';

// Create User (Admin Only)
const createUser = async (body) => {
  const { npm, fullname, studyId } = body;
  try {
    // Check if user already exists
    const user = await prisma.users.findUnique({ where: { npm } });
    if (user) {
      return { message: 'User sudah terdaftar', status: 409 };
    }

    const verifCode = crypto.randomBytes(3).toString('hex');

    // Create user
    await prisma.users.create({
      data: {
        npm,
        fullname,
        studyId: new ObjectId(studyId),
        ukmId: new ObjectId('685735e5401ddd57c671591d'),
        verifCode,
      },
    });
    return { message: 'Berhasil menambahkan user', status: 201 };
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
      return { message: 'User tidak ditemukan', status: 404 };
    }

    return { message: 'Berhasil menghapus user.', status: 200 };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
};

// Get All User (Admin Only)
const getAllUsers = async () => {
  try {
    const users = await prisma.users.findMany({
      where: {
        role: 'User',
      },
      select: {
        id: true,
        npm: true,
        fullname: true,
        studyProgramOrPosition: {
          select: {
            name: true,
          },
        },
        ukm: {
          select: {
            name: true,
          },
        },
        verifCode: true,
      },
    });

    const formattedUsers = users.map((user) => ({
      id: user.id,
      npm: user.npm,
      fullname: user.fullname,
      studyProgramOrPosition: user.studyProgramOrPosition?.name || null,
      ukm: user.ukm?.name || null,
      verifCode: user.verifCode,
    }));

    return {
      message: `Berhasil mengambil data ${users.length} user`,
      status: 200,
      data: formattedUsers,
    };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
};

// Get All Study Or Position
const getAllStudyOrPosition = async () => {
  try {
    const studyOrPosition = await prisma.studyOrPosition.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return {
      message: `Berhasil mengambil data ${studyOrPosition.length} jurusan dan jabatan`,
      status: 200,
      data: studyOrPosition,
    };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
};

const getAllUkm = async () => {
  try {
    const ukm = await prisma.ukm.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return {
      message: `Berhasil mengambil data ${ukm.length} ukm`,
      status: 200,
      data: ukm,
    };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
};

// Create jwt token
const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// Cookie Option
const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Hari
  path: '/',
};

// Login
const loginUser = async (body) => {
  const cookieStore = await cookies();
  const { npm, password } = body;
  try {
    // Check if user exists
    const user = await prisma.users.findUnique({ where: { npm } });
    if (!user) {
      return { message: 'User tidak terdaftar', status: 404 };
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { message: 'Password yang anda masukkan salah', status: 401 };
    }

    // Create and assign token
    const token = createToken(user.id, user.role);
    cookieStore.set('token', token, cookieOptions);

    return {
      message: 'Login berhasil',
      token: token,
      status: 200,
    };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
};

// Register User
const registerUser = async (body) => {
  const { npm, password, verifCode } = body;
  try {
    // Check if user already exists
    const user = await prisma.users.findUnique({ where: { npm } });
    if (!user) {
      return { message: 'NPM tidak terdaftar', status: 404 };
    }
    if (user.password !== null) {
      return { message: 'User sudah terdaftar', status: 409 };
    }

    // Check if password is valid
    if (password.length < 8) {
      return { message: 'Password minimal 8 karakter', status: 400 };
    }

    // Check Verif COde
    if (user.verifCode !== verifCode) {
      return { message: 'Kode verifikasi salah', status: 400 };
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Register User
    await prisma.users.update({
      where: { npm },
      data: {
        password: hashedPassword,
      },
    });

    return { message: 'Registrasi berhasil', status: 201 };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
};

const logoutUser = async () => {
  const cookieStore = await cookies();
  try {
    const cookie = cookieStore.get('token');
    if (!cookie) {
      return { message: 'Anda belum login', status: 401 };
    }

    cookieStore.delete('token');
    return { message: 'Berhasil logout', status: 200 };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
};

// Check Auth
const checkAuth = async (tokenValue) => {
  try {
    if (!tokenValue) {
      return { message: 'Anda belum login', status: 401 };
    }

    // Verify Token
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
    const user = await prisma.users.findFirst({
      where: { id: decoded.id },
      select: {
        id: true,
        npm: true,
        fullname: true,
        role: true,
        studyProgramOrPosition: {
          select: {
            id: true,
            name: true,
          },
        },
        ukm: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const formattedUser = {
      id: user.id,
      npm: user.npm,
      fullname: user.fullname,
      role: user.role,
      studyId: user.studyProgramOrPosition.id,
      studyProgramOrPosition: user.studyProgramOrPosition.name,
      ukmId: user.ukm.id,
      ukm: user.ukm.name,
    };

    if (!user) {
      return { message: 'User tidak ditemukan', status: 404 };
    }

    return { message: 'Terautorisasi', status: 200, user: formattedUser };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
};

// Refresh Verif Code
const refreshCode = async () => {
  try {
    const users = await prisma.users.findMany({
      where: {
        password: {
          isSet: false,
        },
      },
      select: {
        id: true,
        npm: true,
        verifCode: true,
      },
    });

    for (const user of users) {
      const verifCode = crypto.randomBytes(3).toString('hex');
      await prisma.users.update({
        where: { id: user.id },
        data: { verifCode },
      });
      console.log(
        'Update verif code npm ' + user.npm + ' menjadi ' + verifCode
      );
    }

    return { message: 'Berhasil refresh verif code', status: 200 };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
};

// Edit Profile User
const editProfileUser = async (id, body) => {
  const { fullname, ukmId } = body;
  try {
    await prisma.users.update({
      where: { id },
      data: {
        fullname,
        ukmId: new ObjectId(ukmId),
      },
    });

    return {
      message: 'Profil berhasil diubah.',
      status: 200,
    };
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
  getAllStudyOrPosition,
  getAllUkm,
  checkAuth,
  logoutUser,
  refreshCode,
  editProfileUser,
};
