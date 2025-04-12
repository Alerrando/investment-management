"use client";
import { useMemo, useState } from "react";

import SkeletonReusable from "@/components/SkeletonReusable/SkeletonReusable";
import { TableReusable } from "@/components/TableReusable";
import { ListStockModelContent } from "@/models/Lists/ListStockModel";
import { useListStocksByLiquidAverage } from "@/provider/Lists/ListStockBy/ListStockByLiquidAverage";

import { SortConfigProps } from "../TableDividend/TableDividend";

export default function TableLiquidAverage() {
  const [sortConfig, setSortConfig] = useState<SortConfigProps>({ key: "liquidCurrent", direction: "asc" });
  const { dataListStocksByLiquidAverage } = useListStocksByLiquidAverage();

  const sortedStocks = useMemo(() => {
    if (dataListStocksByLiquidAverage.content) return [];
    if (!sortConfig.key) return dataListStocksByLiquidAverage.content;

    const sortedData: ListStockModelContent[] = [...dataListStocksByLiquidAverage.content];
    sortedData.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return sortedData;
  }, [sortConfig, dataListStocksByLiquidAverage.content]);

  const tableHead: { key: keyof ListStockModelContent; label: string }[] = [
    { key: "paper", label: "Ação" },
    { key: "liquidCurrent", label: "Liquidez Corrente" },
    { key: "liquid2Month", label: "Liquidez 2 Meses" },
    { key: "quotation", label: "Cotação" },
    { key: "pL", label: "P/L" },
    { key: "pVp", label: "P/VP" },
    { key: "roe", label: "ROE" },
    { key: "dividend", label: "Dividendo" },
  ];

  return (
    <div className="z-30 min-w-[300px] flex-1 transform rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg transition-all hover:shadow-xl dark:border-[#444444] dark:from-[#2C2C2C] dark:to-[#1E1E1E]">
      <header className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Ações com melhores média líquida</h2>
      </header>
      <div className="h-[350px] overflow-y-auto">
        <TableReusable.Root>
          {tableHead.map((head) => (
            <TableReusable.Head
              key={head.key}
              hasSort
              label={head.label}
              sortConfig={sortConfig}
              sortKey={head.key}
              requestSort={requestSort}
            />
          ))}
          <tbody>
            {dataListStocksByLiquidAverage.content.length > 0 ? (
              <>
                {sortedStocks.slice(0, 8).map((stock, index) => (
                  <TableReusable.TbRow key={index}>
                    <TableReusable.TbRowTd stock={stock.paper} />
                    <TableReusable.TbRowTd stock={stock.liquidCurrent} />
                    <TableReusable.TbRowTd stock={stock.liquid2Month} />
                    <TableReusable.TbRowTd stock={stock.quotation} />
                    <TableReusable.TbRowTd stock={stock.pL} />
                    <TableReusable.TbRowTd stock={stock.pVp} />
                    <TableReusable.TbRowTd stock={stock.roe} />
                    <TableReusable.TbRowTd stock={stock.dividend} />
                  </TableReusable.TbRow>
                ))}
              </>
            ) : (
              <SkeletonReusable classNameBody="h-6" hasTBody tableBodyJust sizeBody={8} sizeBodyChild={7} />
            )}
          </tbody>
        </TableReusable.Root>
      </div>
    </div>
  );

  function requestSort(key: keyof ListStockModelContent) {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  }
}
