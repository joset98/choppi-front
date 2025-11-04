import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";
  const inStockOnly = searchParams.get("inStock");

  try {
    const apiUrl = new URL(`http://localhost:4000/stores/${id}/products`);
    apiUrl.searchParams.set("page", page);
    apiUrl.searchParams.set("limit", limit);
    if (inStockOnly) apiUrl.searchParams.set("inStock", inStockOnly);

    const response = await fetch(apiUrl.toString());

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch store products" },
        { status: response.status },
      );
    }

    const data = await response.json();
    const paginatedResponse = {
      data: data.data || data,
      pagination: {
        page: parseInt(page),
        pageSize: data.data
          ? data.pagination?.limit || parseInt(limit)
          : parseInt(limit),
        totalItems: data.total || (data.data ? data.data.length : 0),
        totalPages: data.totalPages || 1,
      },
    };

    return NextResponse.json(paginatedResponse);
  } catch (error) {
    console.error("Error fetching store products from API:", error);
    return NextResponse.json(
      { error: "Failed to fetch store products" },
      { status: 500 },
    );
  }
}
