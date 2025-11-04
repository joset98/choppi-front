import { type NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/utils";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 },
      );
    }

    const product = await response.json();

    // For now, return product without stores (can be enhanced later)
    return NextResponse.json({
      ...product,
      stores: product.stores,
    });
  } catch (error) {
    console.error("Error fetching product from API:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 },
    );
  }
}
