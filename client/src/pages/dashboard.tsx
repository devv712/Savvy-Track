import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Product } from "@shared/schema";

// Extend the Product type to handle deals as string or null
declare module "@shared/schema" {
  interface Product {
    deals?: string | null;
  }
}
import { TrackForm } from "@/components/track-form";
import ProductCard from "@/components/product-card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const { toast } = useToast();

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"]
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({
        title: "Product removed",
        description: "The product has been removed from tracking"
      });
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Price Tracking Dashboard</h1>
          <Link href="/">
            <Button variant="outline" className="text-purple-300 border-purple-500/30 hover:bg-purple-900/20">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>
        </div>

        <TrackForm />

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-purple-300">Tracked Products</h2>
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[300px] animate-pulse bg-purple-900/20 rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products?.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onDelete={() => deleteMutation.mutate(product.id)}
                />
              ))}
              {products?.length === 0 && (
                <p className="text-purple-300/70 col-span-full text-center py-8">
                  No products tracked yet. Add one above to get started!
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}