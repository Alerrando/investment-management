"use client";

import AssetManagement from "./AssetManagement/AssetManagement";
import CalcCompoundInterest from "./CalcCompoundInterest/CalcCompoundInterest";
import InvestmentDistribution from "./InvestmentDistribution/InvestmentDistribution";

export default function InvestmentPlanner() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start px-16 dark:bg-gray-900 dark:text-white">
      <InvestmentDistribution />

      <CalcCompoundInterest />

      <AssetManagement />
    </div>
  );
}
