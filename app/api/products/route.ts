import { type NextRequest, NextResponse } from "next/server"
import { API_BASE_URL } from "@/lib/utils"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = searchParams.get("page") || "1"
    const limit = searchParams.get("limit") || "10"
    const q = searchParams.get("q")
    const category = searchParams.get("category")

    const apiUrl = new URL(`${API_BASE_URL}/products`)
    apiUrl.searchParams.set("page", page)
    apiUrl.searchParams.set("limit", limit)
    if (q) apiUrl.searchParams.set("q", q)
    if (category) apiUrl.searchParams.set("category", category)

    const response = await fetch(apiUrl.toString())
    const data = await response.json()

    // Transform API response to match frontend expectations
    const paginatedResponse = {
      data: data.data,
      pagination: {
        page: parseInt(page),
        pageSize: data.data ? parseInt(limit) : data.total || 0,
        totalItems: data.total || 0,
        totalPages: Math.ceil((data.total || 0) / parseInt(limit)),
      },
    }

    return NextResponse.json(paginatedResponse)
  } catch (error) {
    console.error("Error fetching products from API:", error)
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    )
  }
}
