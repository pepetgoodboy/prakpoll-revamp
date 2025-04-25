"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export async function registerAction(prevData, formData) {
  try {
    const response = await fetch("http://localhost:3000/api/users/register", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        npm: formData.get("npm"),
        fullname: formData.get("fullname"),
        password: formData.get("password"),
        studyProgramOrPosition: formData.get("studyProgramOrPosition"),
        ukm: formData.get("ukm"),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { message: data.message };
    }

    return { success: true, redirectTo: "/login" };
  } catch (error) {
    console.error("Error checking authentication:", error.message);
    return { success: false, message: error.message };
  }
}

export async function loginAction(prevState, formData) {
  try {
    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        npm: formData.get("npm"),
        password: formData.get("password"),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { message: data.message };
    }

    if (data.token) {
      const cookieStore = await cookies();
      cookieStore.set("token", data.token, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
    }

    const decoded = jwt.verify(data.token, process.env.JWT_SECRET);
    const role = decoded.role;

    return {
      success: true,
      message: data.message,
      redirectTo: role === "Admin" ? "/dashboard/admin" : "/dashboard/user",
    };
  } catch (error) {
    console.error("Error checking authentication:", error.message);
    return { success: false, message: error.message };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("token");

  redirect("/login");
}
