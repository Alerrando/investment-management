import { useListFiisByAverageVacancy } from "@/provider/Lists/ListFiisBy/ListFiisByAverageVacancyProvider";
import { useListFiisByDividend } from "@/provider/Lists/ListFiisBy/ListFiisByDividendProvider";
import { useListFiisByMarketValue } from "@/provider/Lists/ListFiisBy/ListFiisByMarketValueProvider";
import { useListFiisByPVP } from "@/provider/Lists/ListFiisBy/ListFiisByPVPProvider";
import { useListFiisByQuantityProperty } from "@/provider/Lists/ListFiisBy/ListFiisByQuantityPropertyProvider";
import { useListFiisByQuotation } from "@/provider/Lists/ListFiisBy/ListFiisByQuotationProvider";

import TableCategories from "./TableCategories/TableCategories";

export default function Categories() {
  const { dataListFiisByDividend } = useListFiisByDividend();
  const { dataListFiisByMarketValue } = useListFiisByMarketValue();
  const { dataListFiisByPVP } = useListFiisByPVP();
  const { dataListFiisByAverageVacancy } = useListFiisByAverageVacancy();
  const { dataListFiisByQuantityProperty } = useListFiisByQuantityProperty();
  const { dataListFiisByQuotation } = useListFiisByQuotation();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div className="min-w-[320px]">
        <TableCategories data={dataListFiisByDividend} title="FIIs que mais pagam dividendos" link="dividend" />
      </div>
      <div className="min-w-[320px]">
        <TableCategories data={dataListFiisByMarketValue} title="FIIs com maior valor de mercado" link="market-value" />
      </div>
      <div className="min-w-[320px]">
        <TableCategories
          data={dataListFiisByQuantityProperty}
          title="FIIs com maior quantidade de imóveis"
          link="quantity-property"
        />
      </div>
      <div className="min-w-[320px]">
        <TableCategories data={dataListFiisByPVP} title="FIIs com maior P/Vp" link="pvp" />
      </div>
      <div className="min-w-[320px]">
        <TableCategories
          data={dataListFiisByAverageVacancy}
          title="FIIs com menor taxa de vacância"
          link="average-vacancy"
        />
      </div>
      <div className="min-w-[320px]">
        <TableCategories data={dataListFiisByQuotation} title="FIIs com maior cotação" link="quotation" />
      </div>
    </div>
  );
}
