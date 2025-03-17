"use client";

import AssetManagement from "./AssetManagement/AssetManagement";
import CalcCompoundInterest from "./CalcCompoundInterest/CalcCompoundInterest";
import InvestmentDistribution from "./InvestmentDistribution/InvestmentDistribution";

export default function InvestmentPlanner() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start gap-12 bg-background px-4 text-primary-t md:px-16">
      <InvestmentDistribution />

      <CalcCompoundInterest />

      <AssetManagement />
    </div>
  );
}
