import { changePasswordSchema } from "@/lib/zod";
import { updatePassword } from "@/services/user.service";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: Params }) {
  try {
    const { username } = params;

    const body = await req.json();

    const validatedBody = changePasswordSchema.parse(body);

    await updatePassword(
      username,
      validatedBody.oldPassword,
      validatedBody.newPassword
    );

    return NextResponse.json(
      {
        ok: true,
        message: `Password of user with username:${username} changed successfully`,
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
