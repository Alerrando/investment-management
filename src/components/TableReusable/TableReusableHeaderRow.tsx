import { TableRow } from "../ui/table";

interface TableReusableHeaderRowProps {
  children: React.ReactNode;
}

export function TableReusableHeaderRow({ children }: TableReusableHeaderRowProps) {
  return <TableRow className="border-b-2 border-b-gray-100 dark:border-b-[#444444]">{children}</TableRow>;
}
