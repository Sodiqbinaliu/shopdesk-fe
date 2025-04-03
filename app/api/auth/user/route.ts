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
    const { id, ...updatedData } = await req.json(); // Extract id from request body
    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const apiUrl = `https://api.timbu.cloud/users/profile/update`;
    console.log(updatedData);
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
export async function PATCH(req: Request) {
  let accessToken = (await cookies()).get("access_token")?.value;
  if (!accessToken) {
    accessToken = await refreshAccessToken();
  }
  const body = await req.formData();
  try {
    const response = await fetch(`https://api.timbu.cloud/users/image/upload`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body,
    });
    const data = await response.json();
    console.log(data);
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
