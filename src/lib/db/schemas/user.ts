/* istanbul ignore file @preserve */
import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import account from "@/lib/db/schemas/account";

const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role"),
  banned: boolean("banned"),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
  email: varchar("email").unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  createdBy: uuid("created_by"),
  updatedBy: uuid("updatedBy"),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
});

export const userRelation = relations(user, ({ one }) => ({
  account: one(account, { fields: [user.id], references: [account.userId] }),
}));

export default user;
