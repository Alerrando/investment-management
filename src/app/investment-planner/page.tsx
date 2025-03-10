"use client";

import AssetManagement from "./AssetManagement/AssetManagement";
import CalcCompoundInterest from "./CalcCompoundInterest/CalcCompoundInterest";
import InvestmentDistribution from "./InvestmentDistribution/InvestmentDistribution";

export default function InvestmentPlanner() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start gap-12 bg-background px-16 text-primary-t">
      <InvestmentDistribution />

      <CalcCompoundInterest />

      <AssetManagement />
    </div>
  );
}
