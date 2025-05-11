/* istanbul ignore file @preserve */
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db-connect";
import { AnyPgTable } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

export const create = async <E extends AnyPgTable>(
  req: NextRequest,
  entity: E,
) => {
  try {
    const db = connectDB();
    const data = await req.json();
    const resp = await db?.insert(entity).values(data).returning();
    return NextResponse.json(
      { data: resp, message: ReasonPhrases.CREATED },
      { status: StatusCodes.CREATED },
    );
  } catch (err: unknown) {
    return NextResponse.json({
      data: err,
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

export const update = async <E extends AnyPgTable>(
  req: NextRequest,
  id: string,
  entity: E,
) => {
  try {
    const db = connectDB();
    const data = await req.json();
    const resp = await db
      ?.update(entity)
      .set({ ...data })
      // @ts-expect-error: has id
      .where(eq(entity.id, id))
      .returning();
    return NextResponse.json(resp);
  } catch (err: unknown) {
    return NextResponse.json(err);
  }
};

export const deleteByID = async <E extends AnyPgTable>(
  id: string,
  entity: E,
) => {
  try {
    const db = connectDB();
    const resp = await db
      ?.delete(entity)
      // @ts-expect-error: has id
      .where(eq(entity.id, id))
      .returning();
    return NextResponse.json(resp);
  } catch (err: unknown) {
    return NextResponse.json(err);
  }
};
