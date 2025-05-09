"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { revalidatePath } from "next/cache";

export async function registerAction(prevData, formData) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/users/register`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          npm: formData.get("npm"),
          password: formData.get("password"),
          verifCode: formData.get("verifCode"),
        }),
      }
    );

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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          npm: formData.get("npm"),
          password: formData.get("password"),
        }),
      }
    );

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

export async function addUserAction(prevData, formData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/users/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token.value}`,
        },
        body: JSON.stringify({
          npm: formData.get("npm"),
          fullname: formData.get("fullname"),
          studyProgramOrPosition: formData.get("studyProgramOrPosition"),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return { message: data.message };
    }
    return { success: true, message: data.message };
  } catch (error) {
    console.error("Error adding user:", error.message);
    return { success: false, message: error.message };
  }
}

export async function deleteUserAction(prevData, formData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return null;
  }

  const userId = formData.get("id");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/users/delete/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token.value}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return { message: data.message };
    }
    return { success: true, message: data.message };
  } catch (error) {
    console.error("Error deleting user:", error.message);
    return { success: false, message: error.message };
  }
}
