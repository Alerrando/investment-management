"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStockDetails } from "@/provider/StockDataDetails";

export function StockOverview() {
  const { stockDetails } = useStockDetails();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="rounded-lg border border-[#8C8C8C]/20 bg-[#232337]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Market Value</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stockDetails.marketData.marketValue}</div>
        </CardContent>
      </Card>

      <Card className="rounded-lg border border-[#8C8C8C]/20 bg-[#232337]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Quote</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stockDetails.marketData.quote}</div>
          <p className="text-xs text-muted-foreground">Last updated: {stockDetails.marketData.lastQuoteDate}</p>
        </CardContent>
      </Card>

      <Card className="rounded-lg border border-[#8C8C8C]/20 bg-[#232337]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Day Variation</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`text-2xl font-bold ${parseFloat(stockDetails.marketData.dayVariation) >= 0 ? "text-green-600" : "text-red-600"}`}
          >
            {stockDetails.marketData.dayVariation}%
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-lg border border-[#8C8C8C]/20 bg-[#232337]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Volume</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stockDetails.marketData.dailyVolume}</div>
        </CardContent>
      </Card>
    </div>
  );
}
