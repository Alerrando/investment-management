import TableDividend from "./TableDividend/TableDividend";
import TableMarketValue from "./TableMarketValue/TableMarketValue";

export default function Categories() {
  return (
    <div className="flex w-full flex-wrap gap-6 overflow-x-auto">
      <TableDividend />
      <TableMarketValue />
      <TableDividend />
    </div>
  );
}
