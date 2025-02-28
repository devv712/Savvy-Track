import { useQuery } from "@tanstack/react-query";
import { PriceHistory } from "@shared/schema";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { format } from "date-fns";

interface PriceChartProps {
  productId: number;
}

export function PriceChart({ productId }: PriceChartProps) {
  const { data: history, isLoading } = useQuery<PriceHistory[]>({
    queryKey: [`/api/products/${productId}/history`]
  });

  if (isLoading) {
    return <div className="h-[300px] animate-pulse bg-purple-900/20 rounded-lg" />;
  }

  const data = history?.map(h => ({
    date: format(new Date(h.timestamp), "MMM d"),
    price: h.price
  }));

  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-10" />
          <XAxis 
            dataKey="date" 
            stroke="hsl(var(--muted-foreground))"
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            tickFormatter={(value) => `₹${value.toLocaleString('en-IN')}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
            }}
            formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, "Price"]}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{
              stroke: "hsl(var(--primary))",
              fill: "hsl(var(--background))",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}