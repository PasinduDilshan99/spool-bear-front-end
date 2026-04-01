import { GET_USER_REVIEWS_DATA } from "@/utils/backEndConstant";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const cookie = request.headers.get("cookie");

    const response = await fetch(GET_USER_REVIEWS_DATA, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(cookie && { Cookie: cookie }),
      },
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json({ error: text }, { status: response.status });
    }

    return NextResponse.json(await response.json());
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong while fetching reviews list" },
      { status: 500 },
    );
  }
}
