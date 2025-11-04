import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!Array.isArray(body)) {
      return NextResponse.json(
        { error: "El body debe ser un array de items" },
        { status: 400 },
      );
    }

    if (body.length === 0) {
      return NextResponse.json(
        { error: "El carrito no puede estar vacío" },
        { status: 400 },
      );
    }

    const apiResponse = await fetch("http://localhost:4000/cart/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!apiResponse.ok) {
      return NextResponse.json(
        { error: "Error al procesar la cotización del carrito" },
        { status: apiResponse.status },
      );
    }

    const data = await apiResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in cart/quote:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 },
    );
  }
}
