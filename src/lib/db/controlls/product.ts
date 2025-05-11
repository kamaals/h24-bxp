/* istanbul ignore file @preserve */
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db-connect";
import { AttributeType, ProductType } from "@/lib/types/product";
import { product, productAttribute } from "@/lib/db/schemas";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { DB } from "@/lib/types/db";
import { eq, asc, desc, count, ne, and } from "drizzle-orm";

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
  pagination: { limit: number; offset: number },
) {
  const order = buildOrder(orderChunk);

  const db = connectDB() as DB;

  const totalProducts = await db
    .select({ count: count() })
    .from(product)
    .where(eq(product.categoryId, id));

  const lastUpdatedProduct = await db.query.product.findFirst({
    orderBy: [desc(product.updatedAt)],
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

  const products = await db.query.product.findMany({
    orderBy: order,
    limit: lastUpdatedProduct ? pagination.limit - 1 : pagination.limit,
    offset:
      lastUpdatedProduct && pagination.offset
        ? pagination.offset - 1
        : pagination.offset || 0,
    where: lastUpdatedProduct
      ? (product) =>
          and(eq(product.categoryId, id), ne(product.id, lastUpdatedProduct.id))
      : (product) => eq(product.categoryId, id),
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

  const productsList = lastUpdatedProduct
    ? [
        { ...lastUpdatedProduct, lastUpdated: true },
        ...products.filter((p) =>
          lastUpdatedProduct ? lastUpdatedProduct.id !== p.id : true,
        ),
      ]
    : products;

  return {
    products: productsList,
    total:
      Array.isArray(totalProducts) && totalProducts.length
        ? totalProducts[0].count
        : 0,
  };
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
