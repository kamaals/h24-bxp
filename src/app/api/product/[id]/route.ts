import { NextRequest } from "next/server";
import { GeneralAsyncRequestParams } from "@/lib/types/shared";
import { deleteByID } from "@/lib/db/controlls/generic";
import { product } from "@/lib/db/schemas";
import { updateProductWithAttributes } from "@/lib/db/controlls/product";

export async function PUT(
  request: NextRequest,
  { params }: { params: GeneralAsyncRequestParams },
) {
  const id = (await params).id;
  return await updateProductWithAttributes(request, id);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: GeneralAsyncRequestParams },
) {
  const id = (await params).id;
  return await updateProductWithAttributes(request, id);
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: GeneralAsyncRequestParams },
) {
  const id = (await params).id;
  return await deleteByID(id, product);
}
