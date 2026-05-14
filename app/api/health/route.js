import { NextResponse } from "next/server";

/**
 * Healthcheck simple para readiness/liveness probes.
 * @returns {Promise<Response>} JSON con estado y timestamp UTC.
 */
export async function GET() {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
}
