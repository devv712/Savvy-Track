import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Star, Award, BadgeCheck } from "lucide-react";

interface Review {
  name: string;
  company: string;
  review: string;
  rating: number;
  verified?: boolean;
}

const reviews: Review[] = [
  {
    name: "Tech Review Weekly",
    company: "Tech Magazine",
    review: "One of the most innovative price tracking solutions we've seen this year.",
    rating: 5,
    verified: true
  },
  {
    name: "Sarah Chen",
    company: "TechCrunch",
    review: "Savvy Track has revolutionized how we monitor e-commerce prices.",
    rating: 5,
    verified: true
  },
  {
    name: "Digital Insights",
    company: "Tech News Network",
    review: "The most comprehensive price tracking tool in the market.",
    rating: 5,
    verified: true
  }
];

export function Reviews() {
  return (
    <div className="py-12 bg-purple-900/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <motion.h2 
            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Trusted by Industry Leaders
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full bg-purple-900/10 border-purple-500/20">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {review.verified && (
                      <BadgeCheck className="h-5 w-5 text-purple-400 mr-2" />
                    )}
                    <h3 className="text-lg font-semibold text-purple-200">{review.name}</h3>
                  </div>
                  <p className="text-sm text-purple-300/70 mb-2">{review.company}</p>
                  <div className="flex mb-4">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-purple-200/90 italic">"{review.review}"</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
