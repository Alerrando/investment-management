import { ArrowDown, ArrowUp } from "lucide-react";

import { TableHead, TableHeader, TableRow } from "../ui/table";

interface TableReusableHeadProps<T extends string> {
  requestSort?: (key: T) => void;
  sortConfig?: { key: T; direction: "asc" | "desc" };
  label: string;
  hasSort: boolean;
  sortKey?: T;
}

export function TableReusableHead<T extends string>({
  hasSort,
  label,
  requestSort,
  sortConfig,
  sortKey,
}: TableReusableHeadProps<T>) {
  return (
    <TableHeader>
      <TableRow className="border-b-2 border-b-gray-100 dark:border-b-[#444444]">
        <TableHead className="px-0" onClick={() => requestSort && requestSort(sortKey as T)}>
          {hasSort && sortConfig ? (
            <div className="flex cursor-pointer items-center gap-2 py-3 font-semibold">
              {label}
              {sortConfig?.key === sortKey &&
                (sortConfig?.direction === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
            </div>
          ) : (
            <span>{label}</span>
          )}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
