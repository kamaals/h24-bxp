/* istanbul ignore file @preserve */
import {
  createProductWithAttributes,
  getAllProductsByCategoryId,
} from "@/lib/db/controlls/product";
import { NextRequest, NextResponse } from "next/server";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

/*
 * queryString: `abc:li,aed:ed` like string
 */
const parseOrderQuery = (queryString: string) => {
  return queryString.split(",");
};

export async function GET(request: NextRequest) {
  try {
    const feature = request?.nextUrl?.searchParams.get("order");
    const categoryId = request?.nextUrl?.searchParams.get("categoryId");
    const slicedQuery = parseOrderQuery(feature ?? "");

    const products = await getAllProductsByCategoryId(
      categoryId as string,
      slicedQuery,
    );

    return NextResponse.json(
      { message: ReasonPhrases.OK, data: products },
      { status: StatusCodes.OK },
    );
  } catch (e) {
    return NextResponse.json({
      data: [e],
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
}

export async function POST(request: NextRequest) {
  return await createProductWithAttributes(request);
}
