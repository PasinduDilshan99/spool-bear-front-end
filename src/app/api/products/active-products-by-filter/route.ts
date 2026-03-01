import { GET_ACTIVE_PRODUCTS_BY_GIVEN_FILTER_PARAMS_DATA } from "@/utils/backEndConstant";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    if (!GET_ACTIVE_PRODUCTS_BY_GIVEN_FILTER_PARAMS_DATA) {
      throw new Error("Backend URL is not defined");
    }

    const body = await request.json();
    console.log("Fetch products React API - Request body:", body);

    const response = await fetch(
      GET_ACTIVE_PRODUCTS_BY_GIVEN_FILTER_PARAMS_DATA,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: request.headers.get("cookie") || "",
        },
        credentials: "include",
        body: JSON.stringify(body),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("Backend returned error:", text);
      return NextResponse.json(
        { error: "Failed to fetch products" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetch products:", error);
    return NextResponse.json(
      { error: "Something went wrong while fetch products" },
      { status: 500 },
    );
  }
}
