import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Phone, Mail, Clock, MessageCircle } from "lucide-react";

export function Support() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            24/7 Customer Support
          </h2>
          <p className="text-purple-300/70 mt-2">
            We're here to help you anytime, anywhere
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-purple-900/20 border-purple-500/20">
              <CardContent className="pt-6">
                <Phone className="h-8 w-8 text-purple-400 mb-4" />
                <h3 className="text-lg font-semibold text-purple-200 mb-2">Phone Support</h3>
                <p className="text-purple-300/70">+1 (800) 123-4567</p>
                <p className="text-purple-300/70">24/7 Toll-free</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-purple-900/20 border-purple-500/20">
              <CardContent className="pt-6">
                <Mail className="h-8 w-8 text-purple-400 mb-4" />
                <h3 className="text-lg font-semibold text-purple-200 mb-2">Email Support</h3>
                <p className="text-purple-300/70">support@savvy-track.com</p>
                <p className="text-purple-300/70">Response within 2 hours</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-purple-900/20 border-purple-500/20">
              <CardContent className="pt-6">
                <MessageCircle className="h-8 w-8 text-purple-400 mb-4" />
                <h3 className="text-lg font-semibold text-purple-200 mb-2">Live Chat</h3>
                <p className="text-purple-300/70">Available 24/7</p>
                <p className="text-purple-300/70">Instant Response</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-purple-900/20 border-purple-500/20">
              <CardContent className="pt-6">
                <Clock className="h-8 w-8 text-purple-400 mb-4" />
                <h3 className="text-lg font-semibold text-purple-200 mb-2">Hours</h3>
                <p className="text-purple-300/70">24 Hours</p>
                <p className="text-purple-300/70">7 Days a Week</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
