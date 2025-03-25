import { twMerge } from "tailwind-merge";

import SkeletonReusable from "../SkeletonReusable/SkeletonReusable";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../ui/table";
import RankingCardItemStock from "./RankingCardItemStock/RankingCardItemStock";

interface RankingCardProps {
  title: string;
  data: any[];
  onViewAll: () => void;
  styleRankingCard?: string;
}

export default function RankingCard({ title, data, onViewAll, styleRankingCard }: RankingCardProps) {
  return (
    <div className={twMerge("z-30 w-full rounded-lg border bg-card p-4 shadow-sm", styleRankingCard)}>
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-primary-t md:text-lg">{title}</h2>
      </header>

      <Table className="space-y-4 overflow-y-auto">
        <TableHeader>
          <TableRow className="border-primary/20 hover:bg-primary/10">
            <TableHead className="pl-4 text-primary-t">Nome</TableHead>
            <TableHead className="pl-4 text-primary-t">Dividendo</TableHead>
            <TableHead className="pl-4 text-primary-t">Cotação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <RankingCardItemStock item={item} index={index} key={`ranking-cark-stock-${index}`} />
            ))
          ) : (
            <SkeletonReusable classNameBody="h-6" sizeBody={3} sizeBodyChild={3} hasTBody tableBodyJust />
          )}
        </TableBody>
      </Table>

      <div className="mt-4 flex justify-center">
        <button
          onClick={onViewAll}
          className="border-full w-full rounded-full border border-gray-300 py-2 font-medium text-gray-600 transition-all hover:border-gray-300 hover:bg-gray-100 hover:text-gray-800 dark:border-[#444444] dark:bg-[#222] dark:text-gray-300 dark:hover:bg-[#444444] dark:hover:text-gray-200"
        >
          Ver mais
        </button>
      </div>
    </div>
  );
}
