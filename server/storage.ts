import { Product, InsertProduct, PriceHistory, products, priceHistory } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Updated schema to include deals (assuming deals are stored as a JSON string)
export interface Product {
  id: number;
  name: string;
  url: string;
  price: number;
  lastChecked: Date;
  deals?: string | null; // Added deals field
}


export interface InsertProduct extends Omit<Product, "id" | "lastChecked"> {
  deals?: string | null; // Added deals field
}

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<Product>): Promise<Product>;
  deleteProduct(id: number): Promise<void>;
  addPriceHistory(productId: number, price: number): Promise<void>;
  getPriceHistory(productId: number): Promise<PriceHistory[]>;
}

export class DatabaseStorage implements IStorage {
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    // Convert deals array to JSON string if it exists
    const dealsString = insertProduct.deals ? JSON.stringify(insertProduct.deals) : null;

    const [product] = await db
      .insert(products)
      .values({
        ...insertProduct,
        deals: dealsString,
        lastChecked: new Date()
      })
      .returning();
    return product;
  }

  async updateProduct(id: number, update: Partial<Product>): Promise<Product> {
    //Handle deals update
    const dealsString = update.deals ? JSON.stringify(update.deals) : null;
    const updatedProduct = { ...update, deals: dealsString }
    const [product] = await db
      .update(products)
      .set(updatedProduct)
      .where(eq(products.id, id))
      .returning();
    return product;
  }

  async deleteProduct(id: number): Promise<void> {
    await db.delete(products).where(eq(products.id, id));
    await db.delete(priceHistory).where(eq(priceHistory.productId, id));
  }

  async addPriceHistory(productId: number, price: number): Promise<void> {
    await db.insert(priceHistory).values({
      productId,
      price,
      timestamp: new Date()
    });
  }

  async getPriceHistory(productId: number): Promise<PriceHistory[]> {
    return await db
      .select()
      .from(priceHistory)
      .where(eq(priceHistory.productId, productId))
      .orderBy(priceHistory.timestamp);
  }
}

export const storage = new DatabaseStorage();