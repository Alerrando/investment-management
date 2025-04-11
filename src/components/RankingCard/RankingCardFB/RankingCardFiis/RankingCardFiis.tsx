import { Building } from "lucide-react";
import { twMerge } from "tailwind-merge";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ListFiisModelContent } from "@/models/Lists/ListFiisModel";

interface RankingCardFiisProps {
  title: string;
  data?: ListFiisModelContent[];
  onViewAll: () => void;
  styleRankingCard?: string;
}

export default function RankingCardFiis({ title, data, onViewAll, styleRankingCard }: RankingCardFiisProps) {
  console.log(data);

  return (
    <div className={twMerge("h-64 w-full rounded-lg border border-border bg-card p-4 shadow-sm", styleRankingCard)}>
      <header className="mb-4 flex items-center justify-between">
        <h2 className="tex-base font-semibold text-primary-t md:text-lg">{title}</h2>
        <button
          className="rounded-md border px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:bg-[#222] dark:text-gray-300 dark:hover:bg-[#444444]"
          onClick={onViewAll}
        >
          View All
        </button>
      </header>

      <div className="h-[80%] w-full overflow-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-b-primary/40 hover:bg-primary/10">
              <TableHead className="text-primary-t">Nome</TableHead>
              <TableHead className="text-primary-t">Preço</TableHead>
              <TableHead className="text-primary-t">Dividendo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data
                ?.sort((item1, item2) => item2.quotation - item1.quotation)
                ?.map((item: ListFiisModelContent, index) => (
                  <TableRow className="border-b-primary/40" key={index}>
                    <TableCell className="text-primary-t">
                      <div className="flex h-full items-center justify-start gap-2">
                        <Building className="h-8 w-8" />
                        <div className="flex h-full flex-col justify-between py-2">
                          <span className="text-[9px] text-primary-t/60">{item.segment}</span>
                          <h2 className="text-[10px]">{item.paper}</h2>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="text-primary-t">${item?.quotation}</TableCell>

                    <TableCell className="text-primary-t">
                      <span>{item?.dividend}</span>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
