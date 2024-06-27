import { searchProjectSchema } from "@/lib/zod";
import { searchProjectsByTags } from "@/services/project.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedBody = searchProjectSchema.parse(body);

    const projects = await searchProjectsByTags(validatedBody.tags);

    return NextResponse.json(
      {
        ok: true,
        projects,
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
