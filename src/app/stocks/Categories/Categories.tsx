import { useListStocksByDividend } from "@/provider/Lists/ListStockBy/ListStockByDividendProvider";
import { useListStocksByLiquidAverage } from "@/provider/Lists/ListStockBy/ListStockByLiquidAverage";
import { useListStocksByMarketValue } from "@/provider/Lists/ListStockBy/ListStockByMarketValueProvider";
import { useListStocksByPL } from "@/provider/Lists/ListStockBy/ListStockByPlProvider";
import { useListStocksByRevenueGrowth } from "@/provider/Lists/ListStockBy/ListStockByRevenueGrowthProvider";
import { useListStocksByRoe } from "@/provider/Lists/ListStockBy/ListStockByRoeProvider";

import TableCategories from "./TableCategories/TableCategories";

export default function Categories() {
  const { dataListStocksByDividend } = useListStocksByDividend();
  const { dataListStocksByMarketValue } = useListStocksByMarketValue();
  const { dataListStocksByPL } = useListStocksByPL();
  const { dataListStocksByRoe } = useListStocksByRoe();
  const { dataListStocksByLiquidAverage } = useListStocksByLiquidAverage();
  const { dataListStocksByRevenueGrowth } = useListStocksByRevenueGrowth();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div className="min-w-[320px]">
        <TableCategories data={dataListStocksByDividend} title="Ações que mais pagam dividendos" link="dividend" />
      </div>
      <div className="min-w-[320px]">
        <TableCategories
          data={dataListStocksByMarketValue}
          title="Ações com maior valor de mercado"
          link="market-value"
        />
      </div>
      <div className="min-w-[320px]">
        <TableCategories
          data={dataListStocksByLiquidAverage}
          title="Ações com melhores média líquida"
          link="liquid-average"
        />
      </div>
      <div className="min-w-[320px]">
        <TableCategories data={dataListStocksByPL} title="Ações com maior P/L" link="pl" />
      </div>
      <div className="min-w-[320px]">
        <TableCategories data={dataListStocksByRoe} title="Ações com maior ROE" link="roe" />
      </div>
      <div className="min-w-[320px]">
        <TableCategories
          data={dataListStocksByRevenueGrowth}
          title="Ações com maior crescimento"
          link="revenue-growth"
        />
      </div>
    </div>
  );
}
