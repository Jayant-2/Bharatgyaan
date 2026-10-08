import { NextRequest, NextResponse } from "next/server";
import { generateTutorAnswer } from "@/server/ai/tutor";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, scope } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: { code: "INVALID_QUERY", message: "Message query is required." } },
        { status: 400 }
      );
    }

    const response = await generateTutorAnswer(message.trim(), scope);

    return NextResponse.json({
      status: "success",
      data: response,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          code: "TUTOR_INTERNAL_ERROR",
          message: error instanceof Error ? error.message : "Failed to process question",
        },
      },
      { status: 500 }
    );
  }
}
