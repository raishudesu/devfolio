import { imageSchema } from "@/lib/zod";
import { addProjectImages, getImagesByProject } from "@/services/image.service";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Params }) {
  try {
    const { id } = params;

    const images = await getImagesByProject(id);
    return NextResponse.json(
      {
        ok: true,
        images,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request, { params }: { params: Params }) {
  try {
    const { id } = params;

    const body = await req.json();

    const imageArray = imageSchema.parse(body);

    console.log(imageArray);

    const images = await addProjectImages(imageArray);

    return NextResponse.json(
      {
        ok: true,
        images,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error,
      },
      {
        status: 500,
      }
    );
  }
}
