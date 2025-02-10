"use client";
import { ChartCandlestick, Medal } from "lucide-react";

import Title from "@/components/Title/Title";
import { TableCell } from "@/components/ui/table";
import { useListStocks } from "@/provider/ListStockProvider";

export default function AllStocksPage() {
  const { dataListStocks, isLoadingListStocks } = useListStocks();

  return (
    <div className="flex h-[calc(100vh_-_53px)] flex-col gap-8 border px-8 pt-8 dark:border-[#444444] dark:bg-[#2C2C2C]">
      <Title name="Todos os Stocks" icon={<Medal size={20} className="text-indigo-600" />} />

      <div className="h-full overflow-y-auto">
        <table className="h-full w-full table-auto border-collapse text-left text-sm text-gray-600 dark:text-gray-300">
          <thead className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3">Papel</th>
              <th className="px-6 py-3">Cotação</th>
              <th className="px-6 py-3">P/L</th>
              <th className="px-6 py-3">P/VP</th>
              <th className="px-6 py-3">Dividend Yield</th>
              <th className="px-6 py-3">Margem Líquida</th>
              <th className="px-6 py-3">ROE</th>
              <th className="px-6 py-3">Valor de Mercado</th>
            </tr>
          </thead>

          <tbody>
            {!isLoadingListStocks && (
              <>
                {dataListStocks.map((stock, index) => (
                  <tr
                    key={index}
                    className="border-b border-b-[#F2F2F2] p-2 transition-colors hover:bg-[#F2F2F2] dark:border-b-[#555] dark:hover:bg-[#444444]"
                  >
                    <TableCell className="pl-4">
                      <div className="flex h-full items-center justify-start gap-2">
                        <ChartCandlestick className="h-8 w-8" />
                        <div className="flex h-full flex-col justify-between py-2">
                          <h2 className="text-[10px]">{stock.paper}</h2>
                        </div>
                      </div>
                    </TableCell>

                    <td className="px-4 py-3">R$ {parseFloat(stock.quotation).toFixed(2)}</td>

                    <td className="px-6 py-4">{parseFloat(stock.pL).toFixed(2)}</td>

                    <td className="px-6 py-4">{parseFloat(stock.pVp).toFixed(2)}</td>

                    <TableCell className="pl-4">
                      <div className="flex w-fit flex-col items-end">
                        <span>{stock.dividend}</span>
                      </div>
                    </TableCell>

                    <td className="px-6 py-4">{stock.liquidMargin}</td>

                    <td className="px-6 py-4">{stock.roe}</td>

                    <TableCell className="pl-4">
                      <div className="flex w-fit flex-col items-end">
                        <span>
                          {parseFloat(stock.marketValue).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </span>
                      </div>
                    </TableCell>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>

        {isLoadingListStocks && (
          <div className="flex h-full w-full items-center justify-center">
            <div
              className="text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
