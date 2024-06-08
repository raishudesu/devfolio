import { geminiConversationSchema } from "@/lib/zod";
import {
  getGeminiConversation,
  updateGeminiConversation,
} from "@/services/ai.service";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Params }) {
  try {
    const { userId, conversationId } = params;

    const content = await getGeminiConversation(userId, conversationId);

    return NextResponse.json(
      {
        ok: true,
        content,
      },
      { status: 200 }
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

export async function PATCH(req: Request, { params }: { params: Params }) {
  try {
    const { conversationId } = params;

    const body = await req.json();

    const validatedBody = geminiConversationSchema.parse(body);

    await updateGeminiConversation(conversationId, validatedBody);

    return NextResponse.json(
      {
        ok: true,
      },
      { status: 200 }
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
