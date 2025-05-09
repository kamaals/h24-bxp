/* istanbul ignore file @preserve */
import { createProductWithAttributes } from "@/lib/db/controlls/product";
import { NextRequest } from "next/server";

export async function GET() {}

export async function POST(request: NextRequest) {
  return await createProductWithAttributes(request);
}
