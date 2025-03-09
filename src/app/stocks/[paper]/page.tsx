"use client";
import { useParams } from "next/navigation";
import { useEffect } from "react";

import { StockOverview } from "@/components/StockOverview/StockOverView";
import { StockTabs } from "@/components/StockTabs/StocksTabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useStockDetails } from "@/provider/StockDataDetails/StockDataDetails";

export default function StockDetail() {
  const { paper } = useParams();
  const { stockDetails, mutateStockDetails } = useStockDetails();

  useEffect(() => {
    (async () => {
      await mutateStockDetails(paper as string);
    })();
  }, [paper]);

  return (
    <div className="container mx-auto space-y-8 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-primary-t">{(paper as string).toUpperCase()}</h1>
        <div className="text-sm text-muted-foreground">Last updated: {stockDetails.marketData.lastBalanceDate}</div>
      </div>

      {stockDetails.marketData ? (
        <StockOverview />
      ) : (
        <>
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton className="h-28 w-full animate-pulse gap-4 rounded-lg" key={index} />
          ))}
        </>
      )}

      <StockTabs />
    </div>
  );
}
