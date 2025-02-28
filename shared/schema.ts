import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  title: text("title").notNull(),
  currentPrice: integer("current_price").notNull(),
  imageUrl: text("image_url").notNull(),
  email: text("email").notNull(),
  priceThreshold: integer("price_threshold"),
  lastChecked: timestamp("last_checked").notNull(),
  deals: text("deals"),
});

export const priceHistory = pgTable("price_history", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .references(() => products.id)
    .notNull(),
  price: integer("price").notNull(),
  timestamp: timestamp("timestamp").notNull()
});

export const insertProductSchema = createInsertSchema(products)
  .omit({ id: true, lastChecked: true })
  .extend({
    url: z.string().url("Please enter a valid URL"),
    email: z.string().email("Please enter a valid email"),
    priceThreshold: z.number().min(0, "Price threshold must be positive")
  });

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type PriceHistory = typeof priceHistory.$inferSelect;