"use client";
import { useMemo, useState } from "react";

import SkeletonReusable from "@/components/SkeletonReusable/SkeletonReusable";
import { TableReusable } from "@/components/TableReusable";
import { TableHeader } from "@/components/ui/table";
import { ListStockModelContent } from "@/models/Lists/ListStockModel";
import { useListStocksByDividend } from "@/provider/Lists/ListStockBy/ListStockByDividendProvider";

export interface SortConfigProps {
  key: keyof ListStockModelContent;
  direction: "asc" | "desc";
}
export default function TableDividend() {
  const [sortConfig, setSortConfig] = useState<SortConfigProps>({ key: "dividend", direction: "asc" });
  const { dataListStocksByDividend } = useListStocksByDividend();
  const tableHead: { key: keyof ListStockModelContent; label: string }[] = [
    { key: "paper", label: "Papel" },
    { key: "dividend", label: "Dividendos" },
    { key: "quotation", label: "Cotação" },
    { key: "pL", label: "P/L" },
    { key: "pVp", label: "P/VP" },
    { key: "pActive", label: "P/Ativo" },
    { key: "pWorkCapital", label: "P/Capital de Giro" },
  ];

  const sortedStocks = useMemo(() => {
    if (dataListStocksByDividend.content) return [];
    if (!sortConfig.key) return dataListStocksByDividend?.content;

    const sortedData: ListStockModelContent[] = [...dataListStocksByDividend.content];
    sortedData.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return sortedData;
  }, [sortConfig, dataListStocksByDividend?.content]);

  return (
    <div className="z-30 min-w-[300px] flex-1 transform rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg transition-all hover:shadow-xl dark:border-[#444444] dark:from-[#2C2C2C] dark:to-[#1E1E1E]">
      <header className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Ações que mais pagam dividendos</h2>
      </header>
      <div className="h-[350px] overflow-y-auto">
        <TableReusable.Root>
          <TableHeader>
            <TableReusable.HeaderRow>
              {tableHead.map((head) => (
                <TableReusable.Head
                  key={head.key}
                  label={head.label}
                  hasSort
                  requestSort={requestSort}
                  sortConfig={sortConfig}
                  sortKey={head.key}
                />
              ))}
            </TableReusable.HeaderRow>
          </TableHeader>
          <tbody>
            {dataListStocksByDividend?.content?.length > 0 ? (
              <>
                {sortedStocks.map((stock: ListStockModelContent, index) => (
                  <TableReusable.TbRow key={index}>
                    {tableHead.map((head) => (
                      <TableReusable.TbRowTd key={head.key} stock={stock[head.key]} />
                    ))}
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
