import { authOptions } from "@/lib/auth";
import { geminiConversationSchema } from "@/lib/zod";
import {
  getGeminiConversation,
  updateGeminiConversation,
} from "@/services/ai.service";
import { getServerSession } from "next-auth";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Params }) {
  const session = getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

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
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

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
