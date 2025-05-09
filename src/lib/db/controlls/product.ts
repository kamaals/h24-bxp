/* istanbul ignore file @preserve */
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db-connect";
import { AttributeType, ProductType } from "@/lib/types/product";
import { product, productAttribute } from "@/lib/db/schemas";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { DB } from "@/lib/types/db";
import { eq } from "drizzle-orm";

export const createProductWithAttributes = async (req: NextRequest) => {
  try {
    const db = connectDB();
    const { attributes, ..._product } = (await req.json()) as ProductType & {
      attributes: Array<AttributeType>;
    };
    const productResp = await db?.insert(product).values(_product).returning();
    const productId = productResp?.[0]?.id;
    const attributesWithProductId = (attributes || []).map((attr) => ({
      ...attr,
      productId,
    }));
    const attributesResp =
      Array.isArray(attributesWithProductId) && attributesWithProductId.length
        ? await db
            ?.insert(productAttribute)
            .values(attributesWithProductId)
            .returning()
        : [];

    return NextResponse.json(
      {
        data: { ...productResp, attributes: attributesResp },
        message: ReasonPhrases.CREATED,
      },
      { status: StatusCodes.CREATED },
    );
  } catch (error) {
    console.error("Error creating product with attributes:", error);
    return NextResponse.json({
      data: error,
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

export async function getAllProductsByCategoryId(id: string) {
  const db = connectDB() as DB;
  const products = await db.query.product.findMany({
    where: (product) => eq(product.categoryId, id),
    with: {
      attributes: {
        columns: {
          name: true,
          type: true,
          code: true,
          id: true,
        },
      },
    },
    columns: {
      id: true,
      name: true,
      categoryId: true,
    },
  });

  return products;
}
