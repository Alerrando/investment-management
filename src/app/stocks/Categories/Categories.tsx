import { useListStocksByDividend } from "@/provider/Lists/ListStockByDividendProvider";
import { useListStocksByMarketValue } from "@/provider/Lists/ListStockByMarketValueProvider";

import TableCategories from "./TableCategories/TableCategories";
import TableLiquidAverage from "./TableLiquidAverage/TableLiquidAverage";

export default function Categories() {
  const { dataListStocksByDividend } = useListStocksByDividend();
  const { dataListStocksByMarketValue } = useListStocksByMarketValue();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div className="min-w-[320px]">
        <TableCategories data={dataListStocksByDividend} />
      </div>
      <div className="min-w-[320px]">
        <TableCategories data={dataListStocksByMarketValue} />
      </div>
      <div className="min-w-[320px]">
        <TableLiquidAverage />
      </div>
      <div className="min-w-[320px]">
        <TableCategories data={dataListStocksByDividend} />
      </div>
      <div className="min-w-[320px]">
        <TableCategories data={dataListStocksByMarketValue} />
      </div>
      <div className="min-w-[320px]">
        <TableLiquidAverage />
      </div>
    </div>
  );
}
