import {
  integer,
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const shortenedLinks = pgTable(
  "shortened_links",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    shortCode: varchar("short_code", { length: 32 }).notNull(),
    url: text("url").notNull(),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "date",
    })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "date",
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("shortened_links_short_code_uidx").on(table.shortCode),
    index("shortened_links_user_id_idx").on(table.userId),
    index("shortened_links_user_created_at_idx").on(
      table.userId,
      table.createdAt,
    ),
  ],
);
