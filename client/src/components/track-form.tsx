import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProductSchema, type InsertProduct } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient"; // Assuming apiRequest is defined here
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";


export function TrackForm() {
  const { toast } = useToast();

  const form = useForm<InsertProduct>({
    resolver: zodResolver(insertProductSchema),
    defaultValues: {
      url: "",
      email: "",
      priceThreshold: 0
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertProduct) => {
      const res = await apiRequest("POST", "/api/products", {
        ...data,
        priceThreshold: parseInt(data.priceThreshold.toString())
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      form.reset();
      toast({
        title: "Product Added Successfully",
        description: "We'll notify you when the price drops below your target",
        variant: "default"
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to Add Product",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-purple-300">Track New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-200">Product URL</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://amazon.in/product/..." 
                        {...field} 
                        className="bg-purple-900/20 border-purple-500/30"
                      />
                    </FormControl>
                    <FormDescription className="text-purple-300/70">
                      Paste the product URL from Amazon.in or Flipkart.com
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-200">Email for notifications</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="your@email.com"
                        {...field} 
                        className="bg-purple-900/20 border-purple-500/30"
                      />
                    </FormControl>
                    <FormDescription className="text-purple-300/70">
                      We'll send you alerts when the price drops
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priceThreshold"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-200">Target Price (₹)</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="Enter target price (e.g. 15000)"
                        className="bg-purple-900/20 border-purple-500/30"
                        value={field.value ? field.value.toLocaleString('en-IN') : ""}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          field.onChange(value ? parseInt(value) : 0);
                        }}
                      />
                    </FormControl>
                    <FormDescription className="text-purple-300/70">
                      We'll notify you when the price drops below this amount
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding Product...
                  </>
                ) : (
                  "Start Tracking"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}