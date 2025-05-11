/* istanbul ignore file @preserve */
import { NextRequest, NextResponse } from "next/server";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { category } from "@/lib/db/schemas";
import { create } from "@/lib/db/controlls/generic";
import { getAllCategories } from "@/lib/db/controlls/category";

export async function GET() {
  const categories = await getAllCategories();

  return NextResponse.json(
    { data: categories, ReasonPhrases: ReasonPhrases.OK },
    { status: StatusCodes.OK },
  );
}

export async function POST(request: NextRequest) {
  return await create(request, category);
}
