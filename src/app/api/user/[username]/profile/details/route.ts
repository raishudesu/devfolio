import { editDetailsSchema } from "@/lib/zod";
import { updateUserDetails } from "@/services/user.service";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: Params }) {
  try {
    const { username } = params;

    const body = await req.json();

    const validatedBody = editDetailsSchema.parse(body);

    await updateUserDetails(username, validatedBody);

    return NextResponse.json(
      {
        ok: true,
        message: `User with username:${username} updated successfully`,
      },
      {
        status: 200,
      }
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
