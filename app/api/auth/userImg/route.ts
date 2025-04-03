import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { refreshAccessToken } from "@/lib/refresh";
export async function PUT(req: Request) {
  let accessToken = (await cookies()).get("access_token")?.value;
  if (!accessToken) {
    accessToken = await refreshAccessToken();
  }
  const body = await req.formData();
  try {
    const response = await fetch(
      `https://api.timbu.cloud/users/me/profile-image`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body,
      }
    );
    console.log(response);
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
