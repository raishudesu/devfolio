import { authOptions } from "@/lib/auth";
import { geminiConversationSchema } from "@/lib/zod";
import { createGeminiConversation } from "@/services/ai.service";
import { getServerSession } from "next-auth";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: Params }) {
  const session = getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const { userId } = params;

    const body = await req.json();

    const validatedBody = geminiConversationSchema.parse(body);

    const content = await createGeminiConversation(userId, validatedBody);
    return NextResponse.json(
      {
        ok: true,
        content,
      },
      {
        status: 201,
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
