import { ChevronDown } from "lucide-react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { useStockDetails } from "@/provider/StockDataDetails/StockDataDetails";
import { useStockShareholdersDetails } from "@/provider/StockDataDetails/StockShareholdersDataDetails";

import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const mockQuoteHistory = [
  { date: "2024-01-01", value: 9500 },
  { date: "2024-01-02", value: 9800 },
  { date: "2024-01-03", value: 9600 },
  { date: "2024-01-04", value: 9900 },
  { date: "2024-01-05", value: 10081.9 },
];

export function StockTabs() {
  const { stockDetails } = useStockDetails();
  const { stockShareholdersDetails } = useStockShareholdersDetails();

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="flex items-center justify-between">
        <TabsTrigger value="overview" className="w-full data-[state=active]:text-primary-t">
          Overview
        </TabsTrigger>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-full w-full data-[state=active]:text-primary-t">
              Information <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem>Shareholders</DropdownMenuItem>
            <DropdownMenuItem>
              <TabsTrigger value="shareholders" className="px-0 data-[state=active]:text-primary-t">
                Main Shareholders
              </TabsTrigger>
            </DropdownMenuItem>
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
            <Card className="rounded-lg border border-primary/40 bg-card">
              <CardHeader>
                <CardTitle className="text-primary-t">Valuation</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-primary-t">P/L</dt>
                    <dd className="text-primary-t">{stockDetails.valuationIndicators.P_L}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-primary-t">P/VP</dt>
                    <dd className="text-primary-t">{stockDetails.valuationIndicators.P_VP}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-primary-t">Dividend Yield</dt>
                    <dd className="text-primary-t">{stockDetails.valuationIndicators.dividendYield}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card className="rounded-lg border border-primary/40 bg-card">
              <CardHeader>
                <CardTitle className="text-primary-t">Profitability</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-primary-t">ROE</dt>
                    <dd className="text-primary-t">{stockDetails.profitabilityIndicators.ROE}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-primary-t">ROIC</dt>
                    <dd className="text-primary-t">{stockDetails.profitabilityIndicators.ROIC}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-primary-t">Net Margin</dt>
                    <dd className="text-primary-t">{stockDetails.profitabilityIndicators.netMargin}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card className="rounded-lg border border-primary/40 bg-card">
              <CardHeader>
                <CardTitle className="text-primary-t">Debt</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-primary-t">Current Liquidity</dt>
                    <dd className="text-primary-t">{stockDetails.debtIndicators.currentLiquidity}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-primary-t">Net Debt/EBITDA</dt>
                    <dd className="text-primary-t">{stockDetails.debtIndicators.netDebtToEBITDA}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-primary-t">Equity/Assets</dt>
                    <dd className="text-primary-t">{stockDetails.debtIndicators.equityToAssets}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-lg border border-primary/40 bg-card">
            <CardHeader>
              <CardTitle className="text-primary-t">Balance Sheet</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid gap-4 md:grid-cols-2">
                <div>
                  <dt className="font-medium text-primary-t">Total Assets</dt>
                  <dd className="text-2xl font-bold text-primary-t">{stockDetails.balanceSheet.totalAssets}</dd>
                </div>
                <div>
                  <dt className="font-medium text-primary-t">Current Assets</dt>
                  <dd className="text-2xl font-bold text-primary-t">{stockDetails.balanceSheet.currentAssets}</dd>
                </div>
                <div>
                  <dt className="font-medium text-primary-t">Cash & Equivalents</dt>
                  <dd className="text-2xl font-bold text-primary-t">
                    {stockDetails.balanceSheet.cashAndCashEquivalents}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-primary-t">Net Debt</dt>
                  <dd className="text-2xl font-bold text-primary-t">{stockDetails.balanceSheet.netDebt}</dd>
                </div>
                <div>
                  <dt className="font-medium text-primary-t">Equity</dt>
                  <dd className="text-2xl font-bold text-primary-t">{stockDetails.balanceSheet.equity}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="rounded-lg border border-primary/40 bg-card">
              <CardHeader>
                <CardTitle className="text-primary-t">Last 12 Months</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div>
                    <dt className="font-medium text-primary-t">Net Revenue</dt>
                    <dd className="text-2xl font-bold text-primary-t">
                      {stockDetails.incomeStatement.last12Months.netRevenue}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-primary-t">EBIT</dt>
                    <dd className="text-2xl font-bold text-primary-t">
                      {stockDetails.incomeStatement.last12Months.EBIT}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-primary-t">Net Income</dt>
                    <dd className="text-2xl font-bold text-primary-t">
                      {stockDetails.incomeStatement.last12Months.netIncome}
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card className="rounded-lg border border-primary/40 bg-card">
              <CardHeader>
                <CardTitle className="text-primary-t">Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="font-medium text-primary-t">Sector</dt>
                    <dd className="text-primary-t/70">{stockDetails.marketData.sector}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-primary-t">Sub-sector</dt>
                    <dd className="text-primary-t/70">{stockDetails.marketData.subSector}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-primary-t">Share Type</dt>
                    <dd className="text-primary-t/70">{stockDetails.marketData.shareType}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-primary-t">Total Shares</dt>
                    <dd className="text-primary-t/70">{stockDetails.marketData.shares.toLocaleString()}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="quotes">
        <Card>
          <CardHeader>
            <CardTitle>Stock Price History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockQuoteHistory} className="text-primary-t">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={["auto", "auto"]} />
                  <Tooltip
                    formatter={(value) => formatCurrency(Number(value))}
                    labelFormatter={(label) => new Date(label).toLocaleDateString()}
                    labelClassName="font-semibold text-primary-t"
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary-t))"
                    className="stroke-primary-t text-primary-t"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="shareholders">
        <Card className="rounded-lg border border-primary/40 bg-card">
          <CardHeader>
            <CardTitle className="text-primary-t">Main Shareholders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stockShareholdersDetails.map((shareholder, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-primary-t">{shareholder.name}</TableCell>
                    <TableCell className="text-right text-primary-t">{shareholder.percentage}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
