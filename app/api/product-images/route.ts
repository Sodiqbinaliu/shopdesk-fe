import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { refreshAccessToken } from "@/lib/refresh";

export async function PUT(request: NextRequest) {
  const access_token = await accessToken();
  const { searchParams } = new URL(request.url);
  const product_id = searchParams.get("product_id");
  if (!product_id)
    return NextResponse.json(
      { error: "Product ID is required." },
      { status: 400 }
    );
  const apiUrl = `https://api.timbu.cloud/products/${product_id}?product_id=${product_id}`;
  const formData = await request.formData();
  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return NextResponse.json(await response.json(), {
      status: response.status,
    });
  } catch (error) {
    return catchError(error);
  }
}

export async function GET(request: NextRequest) {
  const access_token = await accessToken();
  const { searchParams } = new URL(request.url);
  const product_id = searchParams.get("product_id");
  const organization_id = searchParams.get("organization_id");
  if (!product_id || !organization_id)
    NextResponse.json(
      { error: "Product ID and Organization ID are required" },
      { status: 400 }
    );
  const apiUrl = `https://api.timbu.cloud/products/${product_id}?organization_id=${organization_id}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok)
      return NextResponse.json(
        { error: "Request Failed with status " + response.status },
        { status: response.status }
      );
    const productData = await response.json();
    const productPhotos = productData.photos;
    const photoDetails = productPhotos.map(
      (photo: {
        url: string;
        position: number;
        filename: string;
        model_id: string;
      }) => ({
        src: `https://api.timbu.cloud/images/${photo.url}`,
        position: photo.position,
        productId: photo.model_id,
        id: photo.filename,
      })
    );
    return NextResponse.json(photoDetails, { status: response.status });
  } catch (error) {
    return catchError(error);
  }
}

export async function DELETE(
  request: NextRequest
): Promise<NextResponse<string | { error: string }>> {
  const access_token = await accessToken();
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");
  const product_id = searchParams.get("product_id");
  const organization_id = searchParams.get("organization_id");
  if (!filename)
    return NextResponse.json({ error: "Filename not Found" }, { status: 400 });
  const apiUrl = `https://api.timbu.cloud/products/image/${product_id}/${filename}?organization_id=${organization_id}`;
  const body = JSON.stringify({
    organization_id,
  });
  try {
    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body,
    });
    if (!response.ok)
      return NextResponse.json(
        {
          error:
            "There was an error deleting the image. Request failed witht the status code: " +
            response.status,
        },
        { status: response.status }
      );
    const message = await response.json();
    return NextResponse.json(message);
  } catch (error) {
    return catchError(error);
  }
}

async function accessToken() {
  let accessToken = (await cookies()).get("access_token")?.value;
  if (!accessToken) {
    accessToken = await refreshAccessToken();
  }
  return accessToken;
}

async function catchError(error: any) {
  return NextResponse.json(
    {
      error:
        error instanceof Error
          ? error.message
          : "Internal Server Error. Please try again",
    },
    { status: 500 }
  );
}
