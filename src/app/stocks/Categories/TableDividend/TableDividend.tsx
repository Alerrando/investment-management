import { ArrowRight } from "lucide-react";

import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useListStocksByDividend } from "@/provider/Lists/ListStockByDividendProvider";

import SkeletonCategories from "../SkeletonCategories";

export default function TableDividend() {
  const { dataListStocksByDividend } = useListStocksByDividend();

  console.log(dataListStocksByDividend);

  return (
    <div className="z-30 min-w-[300px] flex-1 transform rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg transition-all hover:shadow-xl dark:border-[#444444] dark:from-[#2C2C2C] dark:to-[#1E1E1E]">
      <header className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Ações que mais pagam dividendos</h2>
      </header>
      <Table className="min-w-full table-auto">
        <TableHeader>
          <TableRow className="border-b-2 border-b-gray-100 dark:border-b-[#444444]">
            <TableHead className="py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Ação</TableHead>
            <TableHead className="py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Dividendo</TableHead>
            <TableHead className="py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Preço</TableHead>
            <TableHead className="py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">P/L</TableHead>
            <TableHead className="py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">ROE</TableHead>
          </TableRow>
        </TableHeader>
        <tbody>
          {dataListStocksByDividend.length > 0 ? (
            <>
              {dataListStocksByDividend
                .filter((_, index) => index < 3)
                .map((stock, index) => (
                  <TableRow
                    key={index}
                    className="border-b-2 border-b-gray-100 transition-colors duration-300 hover:bg-gray-50 dark:border-b-[#555] dark:hover:bg-[#444444]"
                  >
                    <td className="py-4 text-sm font-medium text-gray-900 dark:text-white">{stock.paper}</td>
                    <td className="py-4 text-sm text-gray-700 dark:text-gray-300">{stock.dividend}</td>
                    <td className="py-4 text-sm text-gray-700 dark:text-gray-300">{stock.quotation}</td>
                    <td className="py-4 text-sm text-gray-700 dark:text-gray-300">{stock.pL}</td>
                    <td className="py-4 text-sm text-gray-700 dark:text-gray-300">{stock.roe}</td>
                  </TableRow>
                ))}
            </>
          ) : (
            <SkeletonCategories quantity={5} />
          )}
        </tbody>
      </Table>
      <div className="mt-6 flex justify-center">
        <button className="flex w-full items-center justify-center rounded-full border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-800 transition-all duration-200 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-900 dark:border-[#444444] dark:bg-[#333] dark:text-gray-300 dark:hover:border-[#555] dark:hover:bg-[#444444]">
          Ver mais
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
