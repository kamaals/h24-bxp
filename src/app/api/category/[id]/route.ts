/* istanbul ignore file @preserve */

import { deleteByID, update } from "@/lib/db/controlls/generic";
import { GeneralAsyncRequestParams } from "@/lib/types/shared";
import { category } from "@/lib/db/schemas";
import { NextRequest } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: GeneralAsyncRequestParams },
) {
  const id = (await params).id;
  return await update(request, id, category);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: GeneralAsyncRequestParams },
) {
  const id = (await params).id;
  return await update(request, id, category);
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: GeneralAsyncRequestParams },
) {
  const id = (await params).id;
  return await deleteByID(id, category);
}
