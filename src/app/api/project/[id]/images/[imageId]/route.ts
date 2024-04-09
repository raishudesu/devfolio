import { deleteImage } from "@/services/image.service";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    const { id: projectId, imageId } = params;

    await deleteImage(imageId, projectId);

    return NextResponse.json(
      {
        ok: true,
        message: "Image deleted successfully",
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
