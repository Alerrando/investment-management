"use client";
import { BarChart3, Building, Building2, DollarSign, MapPin, Percent, TrendingUp } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function StockDetail() {
  const { paper } = useParams();
  const [stockData, setStockData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStockData = async () => {
      setIsLoading(true);
      const mockData = {
        stock: "HAPV3",
        name: "HAPVIDA",
        close: 2.21,
        change: -0.896860986547086,
        volume: 27813000,
        market_cap: 16801583439.999998,
        logo: "https://s3-symbol-logo.tradingview.com/hapvida--big.svg",
        sector: "Health Services",
        type: "stock",
        description:
          "Hapvida é uma empresa brasileira de saúde que oferece planos de saúde, odontológicos e serviços médicos.",
        historicalData: [
          { date: "2023-10-01", price: 2.3 },
          { date: "2023-10-02", price: 2.25 },
          { date: "2023-10-03", price: 2.2 },
          { date: "2023-10-04", price: 2.21 },
        ],
        financialData: {
          paper: "HAPV3",
          quotation: "R$ 2.21",
          pL: "20.3",
          pVp: "1.5",
          psr: "1.1",
          dividend: "3.5%",
          pActive: "10.5",
          pWorkCapital: "5.5",
          pEbit: "8.4",
          pLiquidCurrentAssets: "12.5",
          evEbit: "7.8",
          evEbitda: "6.3",
          ebitMargin: "15%",
          liquidMargin: "10%",
          liquidCurrent: "1.5",
          roic: "13%",
          roe: "9%",
          liquid2Month: "20%",
          liquidWorth: "R$ 30B",
          liquidDebtEquity: "0.4",
          revenueGrowth5Years: "10%",
          liquityDebtEbitida: "2.1",
          marketValue: "R$ 16B",
        },
      };
      setStockData(mockData);
      setIsLoading(false);
    };

    fetchStockData();
  }, [paper]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!stockData) {
    return <div>Stock não encontrado</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Button
            variant="outline"
            size="default"
            className="rounded-md border-[#2980B9] bg-[#2980B9] text-white transition-colors duration-200 hover:bg-[#3498DB]"
          >
            Voltar para o inicio
          </Button>
        </div>
        <Badge
          variant="outline"
          className="rounded-lg bg-[#1a1a2e] px-4 py-2 text-base font-semibold text-white transition-colors"
        >
          {stockData.sector}
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card className="rounded-lg border border-[#8C8C8C]/20 bg-transparent">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-4xl font-bold text-white">
                {stockData.name} ({stockData.stock})
              </CardTitle>
              <div className="text-3xl font-bold text-white">{`R$ ${stockData.close}`}</div>
            </div>
            <CardDescription className="text-base text-white/70">Current market information</CardDescription>
          </CardHeader>
          <Separator className="bg-[#707070]/40" />

          <CardContent>
            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col">
                <span className="flex items-center gap-1 text-base text-muted-foreground">
                  <DollarSign className="h-4 w-4" /> Dividend
                </span>
                <span className="text-2xl font-semibold text-white">{stockData.financialData.dividend}</span>
              </div>
              <div className="flex flex-col">
                <span className="flex items-center gap-1 text-base text-muted-foreground">
                  <BarChart3 className="h-4 w-4" /> FFO
                </span>
                <span className="text-2xl font-semibold text-white">{stockData.financialData.pL}</span>
              </div>
              <div className="flex flex-col">
                <span className="flex items-center gap-1 text-base text-muted-foreground">
                  <Percent className="h-4 w-4" /> P/VP
                </span>
                <span className="text-2xl font-semibold text-white">{stockData.financialData.pVp}</span>
              </div>
              <div className="flex flex-col">
                <span className="flex items-center gap-1 text-base text-muted-foreground">
                  <TrendingUp className="h-4 w-4" /> Market Value
                </span>
                <span className="text-2xl font-semibold text-white">{stockData.financialData.marketValue}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card className="rounded-lg border border-[#8C8C8C]/20 bg-transparent shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-white">
                <Building2 className="h-6 w-6" /> Market Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-lg text-muted-foreground">Market Value</span>
                  <span className="text-lg font-medium text-white">{stockData.financialData.marketValue}</span>
                </div>
                <Separator className="bg-[#707070]/40" />
                <div className="flex justify-between">
                  <span className="text-lg text-muted-foreground">Volume</span>
                  <span className="text-lg font-medium text-white">{stockData.volume.toLocaleString()}</span>
                </div>
                <Separator className="bg-[#707070]/40" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#8C8C8C]/20 bg-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-white">
                <Building className="h-6 w-6" /> Sector Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-lg text-muted-foreground">Sector</span>
                  <span className="text-lg font-medium">{stockData.sector}</span>
                </div>
                <Separator className="bg-[#707070]/40" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-[#8C8C8C]/20 bg-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <MapPin className="h-6 w-6" /> Sector Analysis
            </CardTitle>
            <CardDescription className="text-white/70">
              Performance metrics for {stockData.name} in the {stockData.sector} sector
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-[#1a1a2e] p-4 shadow-lg">
                <h3 className="mb-2 font-semibold text-white">Dividend Yield</h3>
                <p className="text-sm text-muted-foreground">
                  The annual dividend yield based on current price is approximately{" "}
                  <span className="font-medium text-white">
                    {(((parseFloat(stockData.financialData.dividend) * 12) / stockData.close) * 100).toFixed(2)}%
                  </span>
                </p>
              </div>
              <div className="rounded-lg bg-[#1a1a2e] p-4 shadow-lg">
                <h3 className="mb-2 font-semibold text-white">FFO Yield</h3>
                <p className="text-sm text-muted-foreground">
                  The annual FFO yield based on current price is approximately{" "}
                  <span className="font-medium text-white">
                    {(((parseFloat(stockData.financialData.pL) * 12) / stockData.close) * 100).toFixed(2)}%
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
