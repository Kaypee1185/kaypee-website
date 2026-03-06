
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(
      ${process.env.GHDATA_BASE_URL}/v1/purchaseBundle,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": Bearer ${process.env.GHDATA_API_TOKEN},
          "Accept": "application/json"
        },
        body: JSON.stringify(body)
      }
    );

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { success: false, message: "Bundle purchase failed" },
      { status: 500 }
    );
  }
}
