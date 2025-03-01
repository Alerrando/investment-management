import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useListStocksByLiquidAverage } from "@/provider/Lists/ListStockBy/ListStockByLiquidAverage";

import SkeletonCategories from "../SkeletonCategories";

export default function TableLiquidAverage() {
  const { dataListStocksByLiquidAverage } = useListStocksByLiquidAverage();

  return (
    <div className="z-30 min-w-[300px] flex-1 transform rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg transition-all hover:shadow-xl dark:border-[#444444] dark:from-[#2C2C2C] dark:to-[#1E1E1E]">
      <header className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Ações com melhores média líquida</h2>
      </header>
      <Table className="min-w-full table-auto">
        <TableHeader>
          <TableRow className="border-b-2 border-b-gray-100 dark:border-b-[#444444]">
            <TableHead className="px-0 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Ação</TableHead>
            <TableHead className="px-0 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Valor de M.
            </TableHead>
            <TableHead className="px-0 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Margin L.
            </TableHead>
            <TableHead className="px-0 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Cresci.</TableHead>
            <TableHead className="px-0 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Divida</TableHead>
          </TableRow>
        </TableHeader>
        <tbody>
          {dataListStocksByLiquidAverage.content.length > 0 ? (
            <>
              {dataListStocksByLiquidAverage.content
                .filter((_, index) => index < 3)
                .map((stock, index) => (
                  <TableRow
                    key={index}
                    className="border-b-2 border-b-gray-100 transition-colors duration-300 hover:bg-gray-50 dark:border-b-[#555] dark:hover:bg-[#444444]"
                  >
                    <td className="py-4 text-sm font-medium text-gray-900 dark:text-white">{stock.paper}</td>
                    <td className="py-4 text-sm text-gray-700 dark:text-gray-300">
                      {formatMarketCap(stock.marketValue)}
                    </td>
                    <td className="py-4 text-sm text-gray-700 dark:text-gray-300">{stock.liquidMargin}</td>
                    <td className="py-4 text-sm text-gray-700 dark:text-gray-300">{stock.revenueGrowth5Years}</td>
                    <td className="py-4 text-sm text-gray-700 dark:text-gray-300">{stock.liquidDebtEquity}</td>
                  </TableRow>
                ))}
            </>
          ) : (
            <SkeletonCategories quantity={6} />
          )}
        </tbody>
      </Table>
      <div className="mt-6 flex justify-center">
        <Link href={dataListStocksByLiquidAverage.content.length > 0 ? `/stocks/lists/liquid-average` : "#"}>
          <button className="flex w-full items-center justify-center rounded-full border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-800 transition-all duration-200 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-900 dark:border-[#444444] dark:bg-[#333] dark:text-gray-300 dark:hover:border-[#555] dark:hover:bg-[#444444]">
            Ver mais
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </Link>
      </div>
    </div>
  );

  function formatMarketCap(value: string | number): string {
    const numericValue = typeof value === "string" ? parseFloat(value.replace(/\./g, "")) : value;

    if (isNaN(numericValue)) {
      return "Invalid value";
    }

    if (numericValue >= 1e12) {
      return `${(numericValue / 1e12).toFixed(2)}T`;
    } else if (numericValue >= 1e9) {
      return `${(numericValue / 1e9).toFixed(2)}B`;
    } else if (numericValue >= 1e6) {
      return `${(numericValue / 1e6).toFixed(2)}M`;
    } else {
      return numericValue.toLocaleString();
    }
  }
}
