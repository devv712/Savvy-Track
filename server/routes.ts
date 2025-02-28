import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProductSchema } from "@shared/schema";
import * as cheerio from "cheerio";
import axios from "axios";

const retailers = {
  'amazon.in': {
    priceSelector: '.a-price-whole, #priceblock_ourprice, .a-offscreen',
    titleSelector: '#productTitle',
    imageSelector: '#landingImage, #imgBlkFront'
  },
  'flipkart.com': {
    priceSelector: '._30jeq3, ._1vC4OE',
    titleSelector: '.B_NuCI',
    imageSelector: '._396cs4, ._2r_T1I'
  }
};

async function scrapeProduct(url: string) {
  try {
    console.log('Scraping URL:', url);
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const domain = new URL(url).hostname;
    const retailer = retailers[domain];

    if (!retailer) {
      throw new Error('Unsupported retailer. Please use Amazon.in or Flipkart.com');
    }

    // Extract price
    const priceText = $(retailer.priceSelector).first().text().trim();
    const price = parseInt(priceText.replace(/[^0-9]/g, ''));
    if (!price) {
      throw new Error('Could not extract price from the page');
    }

    // Extract title
    const title = $(retailer.titleSelector).first().text().trim();
    if (!title) {
      throw new Error('Could not extract title from the page');
    }

    // Extract image URL
    const imageUrl = $(retailer.imageSelector).first().attr('src');
    if (!imageUrl) {
      throw new Error('Could not extract image URL from the page');
    }

    // Extract deals information (specifically for Amazon)
    let deals = [];
    if (domain === 'amazon.in') {
      // Look for deal badges
      $('.dealBadge').each((i, el) => {
        const dealText = $(el).text().trim();
        if (dealText) deals.push(dealText);
      });
      
      // Look for discount percentage
      const discountPercentage = $('.savingsPercentage').first().text().trim();
      if (discountPercentage) {
        deals.push(discountPercentage);
      }
      
      // Look for limited time deals
      $('.a-box-inner .a-badge-text').each((i, el) => {
        const badgeText = $(el).text().trim();
        if (badgeText && badgeText.includes('deal')) deals.push(badgeText);
      });
      
      // Look for any coupon offers
      $('.promoPriceBlockMessage').each((i, el) => {
        const promoText = $(el).text().trim();
        if (promoText) deals.push(promoText);
      });
    }

    console.log('Scraped data:', { title, price, imageUrl, deals });
    return { title, currentPrice: price, imageUrl, deals };
  } catch (error) {
    console.error('Scraping error:', error);
    throw new Error('Failed to scrape product details. Please check the URL and try again.');
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all tracked products
  app.get("/api/products", async (_req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // Add new product to track
  app.post("/api/products", async (req, res) => {
    console.log('Received product tracking request:', req.body);

    const result = insertProductSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ 
        error: "Invalid input",
        details: result.error.errors
      });
    }

    try {
      const scrapedData = await scrapeProduct(result.data.url);
      console.log('Successfully scraped data:', scrapedData);

      const product = await storage.createProduct({
        ...result.data,
        ...scrapedData
      });

      // Add initial price history entry
      await storage.addPriceHistory(product.id, scrapedData.currentPrice);
      console.log('Product created successfully:', product);

      res.json(product);
    } catch (error) {
      console.error('Error creating product:', error);
      const message = error instanceof Error ? error.message : "Failed to track product";
      res.status(500).json({ error: message });
    }
  });

  // Get price history for a product
  app.get("/api/products/:id/history", async (req, res) => {
    try {
      const history = await storage.getPriceHistory(parseInt(req.params.id));
      res.json(history);
    } catch (error) {
      console.error('Error fetching price history:', error);
      res.status(500).json({ error: "Failed to fetch price history" });
    }
  });

  // Delete tracked product
  app.delete("/api/products/:id", async (req, res) => {
    try {
      await storage.deleteProduct(parseInt(req.params.id));
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}