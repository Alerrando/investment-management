import { TableRow } from "../ui/table";

interface TableReusableTbodyRowProps {
  children: React.ReactNode;
}

export function TableReusableTbodyRow({ children }: TableReusableTbodyRowProps) {
  return (
    <TableRow className="border-b-2 border-b-gray-100 transition-colors duration-300 hover:bg-gray-50 dark:border-b-[#555] dark:hover:bg-[#444444]">
      {children}
    </TableRow>
  );
}
