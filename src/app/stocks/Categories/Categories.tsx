import { useListStocksByDividend } from "@/provider/Lists/ListStockBy/ListStockByDividendProvider";
import { useListStocksByMarketValue } from "@/provider/Lists/ListStockBy/ListStockByMarketValueProvider";
import { useListStocksByPL } from "@/provider/Lists/ListStockBy/ListStockByPlProvider";
import { useListStocksByRoe } from "@/provider/Lists/ListStockBy/ListStockByRoeProvider";

import TableCategories from "./TableCategories/TableCategories";
import TableLiquidAverage from "./TableLiquidAverage/TableLiquidAverage";
import TableRevenueGrowth from "./TableRevenueGrowth/TableRevenueGrowth";

export default function Categories() {
  const { dataListStocksByDividend } = useListStocksByDividend();
  const { dataListStocksByMarketValue } = useListStocksByMarketValue();
  const { dataListStocksByPL } = useListStocksByPL();
  const { dataListStocksByRoe } = useListStocksByRoe();

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
        <TableLiquidAverage />
      </div>
      <div className="min-w-[320px]">
        <TableCategories data={dataListStocksByPL} title="Ações com maior P/L" link="pl" />
      </div>
      <div className="min-w-[320px]">
        <TableCategories data={dataListStocksByRoe} title="Ações com maior ROE" link="roe" />
      </div>
      <div className="min-w-[320px]">
        <TableRevenueGrowth />
      </div>
    </div>
  );
}
