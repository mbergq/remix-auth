import { timestamp } from "drizzle-orm/pg-core";

export const timestamps = {
  created_at: timestamp().defaultNow().notNull(),
  modified_at: timestamp(),
};
