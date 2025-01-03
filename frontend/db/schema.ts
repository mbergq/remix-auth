import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "./columns.helpers";

export const user = pgTable("app_user", {
  id: uuid().defaultRandom().primaryKey(),
  userName: text("name").notNull(),
  password: text("password").notNull(),
  ...timestamps,
});

export const token = pgTable("token", {
  id: uuid().defaultRandom().primaryKey(),
  accessToken: text("access_token").notNull(),
  refreshToken: text("refresh_token").notNull(),
  userId: uuid("user_id").references(() => user.id),
});
