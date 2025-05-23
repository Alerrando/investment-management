import { ArrowRight } from "lucide-react";
import Link from "next/link";

import SkeletonReusable from "@/components/SkeletonReusable/SkeletonReusable";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ListStockModel } from "@/models/Lists/ListStockModel";

interface TableCategoriesProps {
  title: string;
  data: ListStockModel;
  link: string;
}

export default function TableCategories({ data, title, link }: TableCategoriesProps) {
  return (
    <div className="border-primary-20 z-30 min-w-[300px] flex-1 transform rounded-2xl border bg-card p-6 shadow-lg transition-all hover:shadow-xl">
      <header className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-primary-t">{title}</h2>
      </header>
      <Table className="min-w-full table-auto">
        <TableHeader>
          <TableRow className="border-primary/40">
            <TableHead className="px-0 py-4 text-sm font-semibold text-primary-t/80">Ação</TableHead>
            <TableHead className="px-0 py-4 text-sm font-semibold text-primary-t/80">Valor de M.</TableHead>
            <TableHead className="px-0 py-4 text-sm font-semibold text-primary-t/80">Dividendo</TableHead>
            <TableHead className="px-0 py-4 text-sm font-semibold text-primary-t/80">ROE</TableHead>
            <TableHead className="px-0 py-4 text-sm font-semibold text-primary-t/80">P/L</TableHead>
          </TableRow>
        </TableHeader>
        <tbody>
          {data.content.length > 0 ? (
            <>
              {data.content
                .filter((_, index) => index < 3)
                .map((stock, index) => (
                  <TableRow
                    key={index}
                    className="border-b-2 border-primary/40 transition-colors duration-300 hover:bg-card/80"
                  >
                    <td className="py-4 text-sm font-medium text-primary-t">{stock.paper}</td>
                    <td className="py-4 text-sm text-primary-t">{formatMarketCap(stock.marketValue)}</td>
                    <td className="py-4 text-sm text-primary-t">{stock.dividend}</td>
                    <td className="py-4 text-sm text-primary-t">{stock.roe}</td>
                    <td className="py-4 text-sm text-primary-t">{stock.pL}</td>
                  </TableRow>
                ))}
            </>
          ) : (
            <SkeletonReusable classNameBody="h-6" hasTBody tableBodyJust sizeBody={3} sizeBodyChild={5} />
          )}
        </tbody>
      </Table>
      <div className="mt-6 flex justify-center">
        <Link href={`/stocks/lists/${link}`}>
          <button className="flex w-full items-center justify-center rounded-full border border-input bg-tertiary px-6 py-3 font-semibold text-background transition-colors hover:border-tertiary hover:bg-transparent hover:text-tertiary">
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
