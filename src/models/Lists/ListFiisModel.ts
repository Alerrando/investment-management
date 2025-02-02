export interface ListFiisModel {
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

export interface ListFiisModelContent {
  paper: string;
  segment: string;
  quotation: number;
  ffO: string;
  dividend: string;
  pVp: number;
  marketValue: number;
  liquidity: number;
  quantityProperty: number;
  priceM2: number;
  rentM2: number;
  capRate: string;
  averageVacancy: string;
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
