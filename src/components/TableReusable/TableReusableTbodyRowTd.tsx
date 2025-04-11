import { TableCell } from "../ui/table";

interface TableReusableTbodyRowTdProps<T extends string> {
  stock: T;
}

export function TableReusableTbodyRowTd<T extends string>({ stock }: TableReusableTbodyRowTdProps<T>) {
  return <TableCell className="py-4 text-sm font-medium text-gray-900 dark:text-white">{stock}</TableCell>;
}
