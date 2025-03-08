"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStockDetails } from "@/provider/StockDataDetails/StockDataDetails";

export function StockTabs() {
  const { stockDetails } = useStockDetails();

  return (
    <>
      <div className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="rounded-lg border border-primary/40 bg-card">
            <CardHeader>
              <CardTitle className="text-primary">Valuation</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-primary">P/L</dt>
                  <dd className="text-primary">{stockDetails.valuationIndicators.P_L}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-primary">P/VP</dt>
                  <dd className="text-primary">{stockDetails.valuationIndicators.P_VP}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-primary">Dividend Yield</dt>
                  <dd className="text-primary">{stockDetails.valuationIndicators.dividendYield}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card className="rounded-lg border border-primary/40 bg-card">
            <CardHeader>
              <CardTitle className="text-primary">Profitability</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-primary">ROE</dt>
                  <dd className="text-primary">{stockDetails.profitabilityIndicators.ROE}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-primary">ROIC</dt>
                  <dd className="text-primary">{stockDetails.profitabilityIndicators.ROIC}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-primary">Net Margin</dt>
                  <dd className="text-primary">{stockDetails.profitabilityIndicators.netMargin}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card className="rounded-lg border border-primary/40 bg-card">
            <CardHeader>
              <CardTitle className="text-primary">Debt</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-primary">Current Liquidity</dt>
                  <dd className="text-primary">{stockDetails.debtIndicators.currentLiquidity}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-primary">Net Debt/EBITDA</dt>
                  <dd className="text-primary">{stockDetails.debtIndicators.netDebtToEBITDA}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-primary">Equity/Assets</dt>
                  <dd className="text-primary">{stockDetails.debtIndicators.equityToAssets}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-lg border border-primary/40 bg-card">
          <CardHeader>
            <CardTitle className="text-primary">Balance Sheet</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-4 md:grid-cols-2">
              <div>
                <dt className="font-medium text-primary">Total Assets</dt>
                <dd className="text-2xl font-bold text-primary">{stockDetails.balanceSheet.totalAssets}</dd>
              </div>
              <div>
                <dt className="font-medium text-primary">Current Assets</dt>
                <dd className="text-2xl font-bold text-primary">{stockDetails.balanceSheet.currentAssets}</dd>
              </div>
              <div>
                <dt className="font-medium text-primary">Cash & Equivalents</dt>
                <dd className="text-2xl font-bold text-primary">{stockDetails.balanceSheet.cashAndCashEquivalents}</dd>
              </div>
              <div>
                <dt className="font-medium text-primary">Net Debt</dt>
                <dd className="text-2xl font-bold text-primary">{stockDetails.balanceSheet.netDebt}</dd>
              </div>
              <div>
                <dt className="font-medium text-primary">Equity</dt>
                <dd className="text-2xl font-bold text-primary">{stockDetails.balanceSheet.equity}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="rounded-lg border border-primary/40 bg-card">
            <CardHeader>
              <CardTitle className="text-primary">Last 12 Months</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div>
                  <dt className="font-medium text-primary">Net Revenue</dt>
                  <dd className="text-2xl font-bold text-primary">
                    {stockDetails.incomeStatement.last12Months.netRevenue}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-primary">EBIT</dt>
                  <dd className="text-2xl font-bold text-primary">{stockDetails.incomeStatement.last12Months.EBIT}</dd>
                </div>
                <div>
                  <dt className="font-medium text-primary">Net Income</dt>
                  <dd className="text-2xl font-bold text-primary">
                    {stockDetails.incomeStatement.last12Months.netIncome}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card className="rounded-lg border border-primary/40 bg-card">
            <CardHeader>
              <CardTitle className="text-primary">Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="font-medium text-primary">Sector</dt>
                  <dd className="text-primary/70">{stockDetails.marketData.sector}</dd>
                </div>
                <div>
                  <dt className="font-medium text-primary">Sub-sector</dt>
                  <dd className="text-primary/70">{stockDetails.marketData.subSector}</dd>
                </div>
                <div>
                  <dt className="font-medium text-primary">Share Type</dt>
                  <dd className="text-primary/70">{stockDetails.marketData.shareType}</dd>
                </div>
                <div>
                  <dt className="font-medium text-primary">Total Shares</dt>
                  <dd className="text-primary/70">{stockDetails.marketData.shares.toLocaleString()}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
