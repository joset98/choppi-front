import { type NextRequest, NextResponse } from "next/server";
import { getAuthToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const token = getAuthToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/stores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(await request.json()),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    const newStore = await response.json();
    return NextResponse.json(newStore, { status: 201 });
  } catch (error) {
    console.error("Error creating store:", error);
    return NextResponse.json(
      { error: "Error al crear tienda" },
      { status: 500 },
    );
  }
}
