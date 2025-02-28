import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@shared/schema";
import { Trash2, ExternalLink } from "lucide-react";
import { PriceChart } from "./price-chart";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProductCardProps {
  product: Product;
  onDelete: () => void;
}

export default function ProductCard({ product, onDelete }: ProductCardProps) {
  return (
    <Card>
      <CardHeader className="space-y-0 pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-medium leading-none line-clamp-2">{product.title}</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="aspect-video relative rounded-md overflow-hidden mb-4">
          <img
            src={product.imageUrl || "https://images.unsplash.com/photo-1523275335684-37898b6baf30"}
            alt={product.title}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Current Price</span>
            <span className="font-semibold">₹{(product.currentPrice).toLocaleString('en-IN')}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Target Price</span>
            <span className="font-semibold">₹{(product.priceThreshold || 0).toLocaleString('en-IN')}</span>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full mt-2">
                View History
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Price History</DialogTitle>
              </DialogHeader>
              <PriceChart productId={product.id} />
            </DialogContent>
          </Dialog>

          {product.deals && JSON.parse(product.deals).length > 0 && (
            <div className="mt-2 mb-2">
              <h3 className="text-sm font-semibold text-purple-300 mb-1">Available Deals:</h3>
              <div className="space-y-1">
                {JSON.parse(product.deals).map((deal, index) => (
                  <div key={index} className="text-xs bg-purple-900/30 text-green-300 p-2 rounded-md flex items-center">
                    <span className="mr-1">🏷️</span> {deal}
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button
            variant="ghost"
            className="w-full"
            onClick={() => window.open(product.url, "_blank")}
          >
            Visit Store <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}