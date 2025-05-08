import {categorySchema} from "@/lib/zod-schemas/category";
import {Doc} from "@/lib/types/shared";
import { z } from "zod";

export type CategoryType = z.infer<typeof categorySchema>;
export type CategoryDocType = CategoryType & Doc;
