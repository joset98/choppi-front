import { type NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/utils";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "20";
    const q = searchParams.get("q") || "";
    const search = searchParams.get("search") || "";

    const apiUrl = new URL(`${API_BASE_URL}/stores`);
    apiUrl.searchParams.set("page", page);
    apiUrl.searchParams.set("limit", limit);
    if (q) apiUrl.searchParams.set("q", q);
    if (search) apiUrl.searchParams.set("search", search);

    const response = await fetch(apiUrl.toString());
    const data = await response.json();

    // Transform API response to match frontend expectations
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
    console.error("Error fetching stores from API:", error);
    return NextResponse.json(
      { error: "Failed to fetch stores" },
      { status: 500 },
    );
  }
}
