import { NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";

export async function GET() {
  const startTime = Date.now();
  try {
    const topicCount = await prisma.topic.count();
    const latency = Date.now() - startTime;

    return NextResponse.json({
      status: "ok",
      platform: "BharatGyaan (IKS Learning Platform)",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
      database: {
        connected: true,
        topicsCount: topicCount,
        latencyMs: latency,
      },
      env: process.env.NODE_ENV || "development",
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        error: {
          code: "DB_CONNECTION_FAILED",
          message: error instanceof Error ? error.message : "Database connection check failed",
        },
      },
      { status: 500 }
    );
  }
}
