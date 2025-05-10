/* istanbul ignore file @preserve */
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db-connect";
import { AttributeType, ProductType } from "@/lib/types/product";
import { product, productAttribute } from "@/lib/db/schemas";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { DB } from "@/lib/types/db";
import { eq, asc, desc } from "drizzle-orm";

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const createProductWithAttributes = async (req: NextRequest) => {
  try {
    const db = connectDB();
    const { attributes, ..._product } = (await req.json()) as ProductType & {
      attributes: Array<AttributeType>;
    };
    const productResp = await db
      ?.insert(product)
      .values({
        ..._product,
        photo: [
          `https://picsum.photos/id/${getRandomIntInclusive(10, 200)}/400/300`,
        ],
        price: getRandomIntInclusive(1000, 50000),
      })
      .returning();
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

export const updateProductWithAttributes = async (
  req: NextRequest,
  id: string,
) => {
  try {
    const db = connectDB();
    const { attributes, ..._product } = (await req.json()) as ProductType & {
      attributes: Array<AttributeType>;
    };
    const productResp = await db
      ?.update(product)
      .set({
        ..._product,
      })
      .where(eq(product.id, id))
      .returning();
    const productId = id;

    const attributesWithProductId = (attributes || []).map((attr) => ({
      ...attr,
      productId,
    }));

    await db
      ?.delete(productAttribute)
      .where(eq(productAttribute.productId, id));

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

export const buildOrder = (order: Array<string>) => {
  return order.map((ord) => {
    const [name, _type] = ord.split(":");
    const column = name === "name" ? product.name : product.price;
    const type = _type === "asc" ? asc : desc;
    return type(column);
  });
};

export async function getAllProductsByCategoryId(
  id: string,
  orderChunk: Array<string>,
) {
  const order = buildOrder(orderChunk);
  console.log("Ord", order);

  const db = connectDB() as DB;
  const products = await db.query.product.findMany({
    orderBy: order,
    where: (product) => eq(product.categoryId, id),
    with: {
      category: {
        columns: {
          name: true,
          id: true,
        },
      },
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
      price: true,
      photo: true,
      description: true,
    },
  });

  return products;
}

export async function getProductById(id: string) {
  try {
    const db = connectDB() as DB;
    const product = await db.query.product.findFirst({
      where: (product) => eq(product.id, id),
      with: {
        category: {
          columns: {
            name: true,
            id: true,
          },
        },
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

    return product;
  } catch (e) {
    console.log(e);
    return [];
  }
}
