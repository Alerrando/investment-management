import { twMerge } from "tailwind-merge";

import { Skeleton } from "../ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface SkeletonProps {
  classNameHead?: string;
  classNameBody: string;
  sizeBody: number;
  sizeBodyChild: number;
  sizeHeader?: number;
}

interface SkeletonReusableProps {
  tableComplete: boolean;
  tableBodyJust: boolean;
  hasTBody: boolean;
}

export function TBody({
  classNameBody,
  sizeBody,
  sizeBodyChild,
  hasTBody,
}: Omit<SkeletonProps, "sizeHeader" | "classNameHead"> & { hasTBody: boolean }) {
  if (hasTBody) {
    return (
      <>
        {Array.from({ length: sizeBody }).map((_, indexBody) => (
          <TableRow key={indexBody} className="border-primary-80 border-b transition-all duration-300">
            {Array.from({ length: sizeBodyChild }).map((_, index) => (
              <TableCell className="animate-pulse py-3 pl-0 pr-4" key={index}>
                <Skeleton className={twMerge("w-full bg-skeleton", classNameBody)} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </>
    );
  }

  return (
    <TableBody>
      {Array.from({ length: sizeBody }).map((_, indexBody) => (
        <TableRow key={indexBody} className="border-primary-80 border-b transition-all duration-300">
          {Array.from({ length: sizeBodyChild }).map((_, index) => (
            <TableCell className="animate-pulse py-3 pl-0 pr-4" key={index}>
              <Skeleton className={twMerge("w-full bg-skeleton", classNameBody)} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}

export function THead({
  sizeHeader,
  classNameHead,
}: Omit<SkeletonProps, "sizeBody" | "sizeBodyChild" | "classNameBody">) {
  return (
    <TableHeader className="sticky top-0 z-10 bg-primary">
      <TableRow>
        {Array.from({ length: sizeHeader }).map((_, index) => (
          <TableHead className="animate-pulse px-4 py-3" key={index}>
            <Skeleton className={twMerge("bg-skeleton", classNameHead)} />
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}

export function TableComplete({ classNameBody, sizeBody, sizeBodyChild, classNameHead, sizeHeader }: SkeletonProps) {
  return (
    <Table className="w-full table-auto border-collapse text-left text-sm">
      <THead sizeHeader={sizeHeader} classNameHead={classNameHead} />
      <TBody classNameBody={classNameBody} sizeBody={sizeBody} sizeBodyChild={sizeBodyChild} hasTBody={false} />
    </Table>
  );
}

export default function SkeletonReusable({
  tableBodyJust,
  tableComplete,
  hasTBody,
  ...rest
}: SkeletonReusableProps & SkeletonProps) {
  return (
    <>
      {tableComplete && <TableComplete {...rest} />}

      {tableBodyJust && <TBody {...rest} hasTBody={hasTBody} />}
    </>
  );
}
