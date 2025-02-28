import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const categories = [
  {
    title: "Electronics",
    items: ["Smartphones", "Laptops", "Tablets", "Accessories"]
  },
  {
    title: "Fashion",
    items: ["Men's Clothing", "Women's Clothing", "Kids' Wear", "Accessories"]
  },
  {
    title: "Home & Living",
    items: ["Furniture", "Decor", "Kitchen", "Bedding"]
  },
  {
    title: "Beauty & Personal Care",
    items: ["Skincare", "Makeup", "Haircare", "Fragrances"]
  },
  {
    title: "Books & Stationery",
    items: ["Fiction", "Non-Fiction", "Academic", "Art Supplies"]
  }
];

export default function Categories() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-purple-300">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 ml-4">
            Product Categories
          </h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-purple-900/20 border-purple-500/20 hover:border-purple-500/40 transition-colors">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-purple-300 mb-4">
                    {category.title}
                  </h2>
                  <ul className="space-y-2">
                    {category.items.map((item) => (
                      <li
                        key={item}
                        className="text-purple-200/70 hover:text-purple-200 cursor-pointer transition-colors"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
