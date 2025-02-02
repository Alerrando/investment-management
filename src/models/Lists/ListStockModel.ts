export interface ListStockModel {
  content: Content[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface ListStockModelContent {
  paper: string;
  quotation: string;
  pL: string;
  pVp: string;
  psr: string;
  dividend: string;
  pActive: string;
  pWorkCapital: string;
  pEbit: string;
  pLiquidCurrentAssets: string;
  evEbit: string;
  evEbitda: string;
  ebitMargin: string;
  liquidMargin: string;
  liquidCurrent: string;
  roic: string;
  roe: string;
  liquid2Month: string;
  liquidWorth: string;
  liquidDebtEquity: string;
  revenueGrowth5Years: string;
  liquityDebtEbitida: string;
  marketValue: string;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}
