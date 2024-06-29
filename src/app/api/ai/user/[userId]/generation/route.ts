import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getGeminiConversations } from "@/services/ai.service";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Params }) {
  try {
    const session = getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { userId } = params;

    const content = await getGeminiConversations(userId);

    return NextResponse.json(
      {
        ok: true,
        content,
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
