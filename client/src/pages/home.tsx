import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Bell, LineChart, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Reviews } from "@/components/reviews";
import { Support } from "@/components/support";

const FeatureCard = ({ icon: Icon, title, description, delay, href }: {
  icon: typeof Search;
  title: string;
  description: string;
  delay: number;
  href: string;
}) => (
  <Link href={href}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card className="cursor-pointer bg-purple-900/20 border-purple-500/20 hover:border-purple-500/40 transition-colors">
        <CardContent className="pt-6">
          <Icon className="w-12 h-12 mb-4 text-purple-400" />
          <h3 className="text-xl font-semibold mb-2 text-purple-200">{title}</h3>
          <p className="text-purple-300/70">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  </Link>
);

const Logo = () => (
  <motion.svg
    width="60"
    height="60"
    viewBox="0 0 60 60"
    initial={{ scale: 0 }}
    animate={{ scale: 1, rotate: 360 }}
    transition={{ type: "spring", stiffness: 260, damping: 20 }}
  >
    <motion.circle
      cx="30"
      cy="30"
      r="25"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2 }}
    />
    <motion.path
      d="M20 30 L27 37 L40 23"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 1 }}
    />
  </motion.svg>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black">
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6">
            Savvy Track
          </h1>
          <p className="text-xl text-purple-300/70 max-w-2xl mx-auto">
            Track product prices across e-commerce sites and never miss a deal again
          </p>
          <Link href="/dashboard">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                Start Tracking <ArrowRight className="ml-2" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <FeatureCard
            icon={Search}
            title="Track Any Product"
            description="Simply paste the product URL and we'll monitor its price for you"
            delay={0.2}
            href="/dashboard"
          />
          <FeatureCard
            icon={Bell}
            title="Get Notifications"
            description="Receive email alerts when prices drop below your target"
            delay={0.4}
            href="/dashboard"
          />
          <FeatureCard
            icon={LineChart}
            title="Price History"
            description="View price trends and make informed buying decisions"
            delay={0.6}
            href="/categories"
          />
        </div>

        <Reviews />
        <Support />
      </div>
    </div>
  );
}