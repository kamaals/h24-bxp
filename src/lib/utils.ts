import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generatePagination(
  limit: number,
  total: number,
): Array<number> {
  if (limit <= 0) {
    return [];
  }
  const pagesNeeded = Math.ceil(total / limit);
  const pagination: number[] = [];
  for (let i = 0; i < pagesNeeded; i++) {
    pagination.push(i * limit);
  }
  return pagination;
}
