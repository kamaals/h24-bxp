import { NextResponse } from "next/server";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

export async function GET() {
  return NextResponse.json(
    { data: [], ReasonPhrases: ReasonPhrases.OK },
    { status: StatusCodes.OK }
  );
}
