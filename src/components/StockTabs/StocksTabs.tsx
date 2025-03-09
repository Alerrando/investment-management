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
    </>
  );
}
