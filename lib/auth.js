import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getServerSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/users/check-auth`,
      {
        headers: {
          Cookie: `token=${token.value}`,
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const userData = data.user;

    return userData;
  } catch (error) {
    console.error("Error checking authentication:", error);
    return null;
  }
}

export async function requireAuth() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return session;
}
