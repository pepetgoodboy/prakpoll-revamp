import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

// export const authMiddleware = (handler) => {
//   return async (request, context) => {
//     const params = await context.params;
//     const cookieStore = await cookies();
//     const token = cookieStore.get("token");

//     if (!token) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     try {
//       const decoded = jwt.verify(token.value, process.env.JWT_SECRET);

//       const user = await prisma.user.findUnique({
//         where: { id: decoded.id },
//         select: { id: true },
//       });

//       if (!user) {
//         return NextResponse.json(
//           { message: "User not found" },
//           { status: 404 }
//         );
//       }

//       request.user = user;

//       return handler(request, params);
//     } catch (error) {
//       return NextResponse.json({ message: error.message }, { status: 500 });
//     }
//   };
// };

export const adminMiddleware = (handler) => {
  return async (request, context) => {
    const params = await context.params;
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
      const decoded = jwt.verify(token.value, process.env.JWT_SECRET);

      const user = await prisma.users.findUnique({
        where: { id: decoded.id },
        select: { id: true, role: true },
      });

      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }

      if (user.role !== "Admin") {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
      }

      return handler(request, params);
    } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  };
};
