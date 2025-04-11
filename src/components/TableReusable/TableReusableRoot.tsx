import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

import { Table } from "../ui/table";

interface TableReusableRootProps extends ComponentProps<"table"> {
  children: React.ReactNode;
}

export function TableReusableRoot({ children, ...props }: TableReusableRootProps) {
  return (
    <Table {...props} className={twMerge("min-w-full table-auto", props.className)}>
      {children}
    </Table>
  );
}
