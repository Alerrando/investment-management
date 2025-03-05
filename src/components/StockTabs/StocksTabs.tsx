"use client";

import { ChevronDown } from "lucide-react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStockDetails } from "@/provider/StockDataDetails";

const mockQuoteHistory = [
  { date: "2024-01-01", value: 9500 },
  { date: "2024-01-02", value: 9800 },
  { date: "2024-01-03", value: 9600 },
  { date: "2024-01-04", value: 9900 },
  { date: "2024-01-05", value: 10081.9 },
];

export function StockTabs() {
  const { stockDetails } = useStockDetails();

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger className="w-full" value="overview">
          Overview
        </TabsTrigger>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full">
              Information <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem>Shareholders</DropdownMenuItem>
            <DropdownMenuItem>Main Shareholders</DropdownMenuItem>
            <DropdownMenuItem>Administration</DropdownMenuItem>
            <DropdownMenuItem>Relevant Facts</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <TabsTrigger className="w-full" value="quotes">
          Quotes
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <div className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="rounded-lg border border-[#8C8C8C]/20 bg-[#232337]">
              <CardHeader>
                <CardTitle>Valuation</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt>P/L</dt>
                    <dd>{stockDetails.valuationIndicators.P_L}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>P/VP</dt>
                    <dd>{stockDetails.valuationIndicators.P_VP}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Dividend Yield</dt>
                    <dd>{stockDetails.valuationIndicators.dividendYield}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card className="rounded-lg border border-[#8C8C8C]/20 bg-[#232337]">
              <CardHeader>
                <CardTitle>Profitability</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt>ROE</dt>
                    <dd>{stockDetails.profitabilityIndicators.ROE}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>ROIC</dt>
                    <dd>{stockDetails.profitabilityIndicators.ROIC}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Net Margin</dt>
                    <dd>{stockDetails.profitabilityIndicators.netMargin}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card className="rounded-lg border border-[#8C8C8C]/20 bg-[#232337]">
              <CardHeader>
                <CardTitle>Debt</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt>Current Liquidity</dt>
                    <dd>{stockDetails.debtIndicators.currentLiquidity}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Net Debt/EBITDA</dt>
                    <dd>{stockDetails.debtIndicators.netDebtToEBITDA}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Equity/Assets</dt>
                    <dd>{stockDetails.debtIndicators.equityToAssets}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-lg border border-[#8C8C8C]/20 bg-[#232337]">
            <CardHeader>
              <CardTitle>Balance Sheet</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid gap-4 md:grid-cols-2">
                <div>
                  <dt className="font-medium">Total Assets</dt>
                  <dd className="text-2xl font-bold">{stockDetails.balanceSheet.totalAssets}</dd>
                </div>
                <div>
                  <dt className="font-medium">Current Assets</dt>
                  <dd className="text-2xl font-bold">{stockDetails.balanceSheet.currentAssets}</dd>
                </div>
                <div>
                  <dt className="font-medium">Cash & Equivalents</dt>
                  <dd className="text-2xl font-bold">{stockDetails.balanceSheet.cashAndCashEquivalents}</dd>
                </div>
                <div>
                  <dt className="font-medium">Net Debt</dt>
                  <dd className="text-2xl font-bold">{stockDetails.balanceSheet.netDebt}</dd>
                </div>
                <div>
                  <dt className="font-medium">Equity</dt>
                  <dd className="text-2xl font-bold">{stockDetails.balanceSheet.equity}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="rounded-lg border border-[#8C8C8C]/20 bg-[#232337]">
              <CardHeader>
                <CardTitle>Last 12 Months</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div>
                    <dt className="font-medium">Net Revenue</dt>
                    <dd className="text-2xl font-bold">{stockDetails.incomeStatement.last12Months.netRevenue}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">EBIT</dt>
                    <dd className="text-2xl font-bold">{stockDetails.incomeStatement.last12Months.EBIT}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Net Income</dt>
                    <dd className="text-2xl font-bold">{stockDetails.incomeStatement.last12Months.netIncome}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card className="rounded-lg border border-[#8C8C8C]/20 bg-[#232337]">
              <CardHeader>
                <CardTitle>Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="font-medium">Sector</dt>
                    <dd className="text-muted-foreground">{stockDetails.marketData.sector}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Sub-sector</dt>
                    <dd className="text-muted-foreground">{stockDetails.marketData.subSector}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Share Type</dt>
                    <dd className="text-muted-foreground">{stockDetails.marketData.shareType}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Total Shares</dt>
                    <dd className="text-muted-foreground">{stockDetails.marketData.shares.toLocaleString()}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="quotes">
        <Card className="rounded-lg border border-[#8C8C8C]/20 bg-[#232337]">
          <CardHeader>
            <CardTitle>Stock Price History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockQuoteHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={["auto", "auto"]} />
                  <Tooltip
                    formatter={(value) => Number(value)}
                    labelFormatter={(label) => new Date(label).toLocaleDateString()}
                  />
                  <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
