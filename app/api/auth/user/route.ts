import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { refreshAccessToken } from "@/lib/refresh";

export async function GET() {
  const apiUrl = "https://api.timbu.cloud/users/me";
  let accessToken = (await cookies()).get("access_token")?.value;
  if (!accessToken) {
    accessToken = await refreshAccessToken();
  }
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
    if (!response.ok)
      return NextResponse.json(
        { error: "Request failed with Status: " + response.status },
        { status: response.status }
      );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  let accessToken = (await cookies()).get("access_token")?.value;
  if (!accessToken) {
    accessToken = await refreshAccessToken();
  }

  try {
    const rawBody = await req.text();
    console.log("Raw request body:", rawBody);

    if (!rawBody) {
      return NextResponse.json(
        { error: "Request body is empty" },
        { status: 400 }
      );
    }

    const updatedData = JSON.parse(rawBody);
    console.log("Parsed Updated Data:", updatedData);

    const apiUrl = `https://api.timbu.cloud/users/me`;
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updatedData),
    });

    const responseBody = await response.text();
    console.log("Response Body:", responseBody);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Request failed with status: ${response.status}` },
        { status: response.status }
      );
    }

    const data = JSON.parse(responseBody);
    console.log("Parsed API Response:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}



