"use server";
import { getAllProductsByCategoryId } from "@/lib/db/controlls/product";

export async function getProductsByCategory(categoryId: string) {
  return await getAllProductsByCategoryId(categoryId);
}
