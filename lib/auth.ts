"use server";

import { cookies } from "next/headers";

export interface User {
  id: string;
  email: string;
  name: string;
}

export async function loginAPI(
  email: string,
  password: string,
): Promise<{ success: boolean; error?: string; token?: string; user?: User }> {

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    return { success: false, error: data.message || "Login failed" };
  }
  // Store JWT token in cookie
  const cookieStore = await cookies();
  cookieStore.set(
    "auth_token",
    data.token,
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  );

  // Also store user info for convenience
  cookieStore.set(
    "auth_user",
    JSON.stringify({
      id: data.user.id,
      email: data.user.email,
      name: data.user.email.split('@')[0], // Simple name generation
    }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  );

  return {
    success: true,
    token: data.token,
    user: {
      id: data.user.id,
      email: data.user.email,
      name: data.user.email.split('@')[0],
    },
  };
}

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("auth_token");
  return tokenCookie?.value || null;
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("auth_user");

  if (!userCookie) {
    return null;
  }

  try {
    return JSON.parse(userCookie.value);
  } catch {
    return null;
  }
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  cookieStore.delete("auth_user");
}
