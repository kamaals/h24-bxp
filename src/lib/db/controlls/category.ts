/* istanbul ignore file @preserve */
import { connectDB } from "@/lib/db/db-connect";
import { CategoryWithChildren } from "@/lib/types/category";
import { DB } from "@/lib/types/db";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const getAllCategories = async () => {
  const db = connectDB(); // Assuming you have a schema object
  try {
    return await getCategoryTree(db as DB, null, 10);
  } catch (e) {
    return e;
  }
};

export async function getCategoryTree(
  db: DB,
  parentId: string | null,
  maxDepth = 10,
) {
  if (maxDepth <= 0) return [];

  const categories = (await db.query.category.findMany({
    with: {
      products: {
        columns: {
          name: true,
          id: true,
        },
      },
    },
    where:
      parentId === null
        ? (category, { isNull }) => isNull(category.parentId)
        : (category) => eq(category.parentId, parentId),
  })) as Array<CategoryWithChildren>;

  for (const category of categories) {
    category.children = await getCategoryTree(db, category.id, maxDepth - 1);
  }

  return categories;
}

export const getById = async (id: string) => {
  try {
    const db = connectDB();
    const resp = await db?.query.category.findFirst({
      where: (cate) => eq(cate.id, id),
    });
    return NextResponse.json(resp);
  } catch (err: unknown) {
    return NextResponse.json(err);
  }
};
