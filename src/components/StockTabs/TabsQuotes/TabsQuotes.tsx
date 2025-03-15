import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

const mockQuoteHistory = [
  { date: "2024-01-01", value: 9500 },
  { date: "2024-01-02", value: 9800 },
  { date: "2024-01-03", value: 9600 },
  { date: "2024-01-04", value: 9900 },
  { date: "2024-01-05", value: 10081.9 },
];

export default function TabsQuotes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Price History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockQuoteHistory} className="text-tertiary">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip
                formatter={(value: string) => formatCurrency(Number(value))}
                labelFormatter={(label: string) => new Date(label).toLocaleDateString()}
                labelClassName="font-semibold text-tertiary"
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--tertiary))"
                className="bg-background text-tertiary"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
