import { geminiConversationSchema } from "@/lib/zod";
import { createGeminiConversation } from "@/services/ai.service";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: Params }) {
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
