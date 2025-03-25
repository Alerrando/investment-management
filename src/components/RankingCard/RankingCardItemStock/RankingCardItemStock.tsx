"use client";
import { Building2 } from "lucide-react";
import { useState } from "react";

import { TableCell, TableRow } from "@/components/ui/table";
import { useQueryHook } from "@/hook/useQueryHook";
import { ListStockModelContent } from "@/models/Lists/ListStockModel";

import { getLogo } from "../../../app/api/getLogo";

interface RankingCardItemStockProps {
  item: ListStockModelContent;
  index: number;
}

export default function RankingCardItemStock({ item, index }: RankingCardItemStockProps) {
  const [img, setImage] = useState<string | undefined>("/path-to-placeholder-image");

  const { isLoading } = useQueryHook({
    queryKey: ["query-logo", item.paper],
    options: {
      queryFn: () => getLogo({ name: item.paper }),
      staleTime: Infinity,
      cacheTime: Infinity,
      onSuccess: (data) => {
        if (data && data[0]?.icon) {
          setImage(data[0].icon);
        } else {
          setImage(data);
        }
      },
      onError: (err) => {
        console.error("Error fetching logo:", err);
      },
    },
  });

  return (
    <TableRow key={index} className="border-b border-b-[#F2F2F2] p-2 hover:bg-skeleton dark:border-b-[#555]">
      <TableCell>
        <div className="flex items-center gap-2">
          {isLoading || img === "/path-to-placeholder-image" || img?.length === 0 ? (
            <Building2 size={28} className="text-primary-t" />
          ) : (
            <img src={img && img} alt={item.paper} className="h-8 w-8 rounded-full" />
          )}
          <div>
            <h3 className="text-sm text-primary-t">{item.paper}</h3>
          </div>
        </div>
      </TableCell>

      <TableCell className="w-16 text-right text-sm text-primary-t">{item.dividend}</TableCell>

      <TableCell className="w-16 text-right text-sm text-primary-t">{item.quotation}</TableCell>
    </TableRow>
  );
}
