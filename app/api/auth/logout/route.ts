import { logout } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await logout();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error al cerrar sesión" },
      { status: 500 },
    );
  }
}
