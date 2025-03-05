import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { ListFiisModel } from "@/models/Lists/ListFiisModel";
import { ListStockModel } from "@/models/Lists/ListStockModel";
import { StockDetailsModel } from "@/models/StockDetailsModel";

export const api = axios.create();

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

api.interceptors.request.use(async (config) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return config;
});

export const initialStateStockProvider: ListStockModel = {
  content: [],
  pageable: {
    sort: {
      unsorted: true,
      sorted: false,
      empty: true,
    },
    offset: 0,
    pageNumber: 0,
    pageSize: 10,
    paged: true,
    unpaged: false,
  },
  totalPages: 0,
  totalElements: 0,
  last: false,
  size: 0,
  number: 0,
  sort: {
    unsorted: true,
    sorted: false,
    empty: true,
  },
  numberOfElements: 0,
  first: true,
  empty: true,
};

export const initialStateFiisProvider: ListFiisModel = {
  content: [],
  pageable: {
    sort: {
      unsorted: true,
      sorted: false,
      empty: true,
    },
    offset: 0,
    pageNumber: 0,
    pageSize: 10,
    paged: true,
    unpaged: false,
  },
  totalPages: 0,
  totalElements: 0,
  last: false,
  size: 0,
  number: 0,
  sort: {
    unsorted: true,
    sorted: false,
    empty: true,
  },
  numberOfElements: 0,
  first: true,
  empty: true,
};

export const initialStateStockDetails: StockDetailsModel = {
  marketData: {
    marketValue: "",
    firmValue: "",
    shares: "",
    lastBalanceDate: "",
    sector: "",
    subSector: "",
    quote: "",
    lastQuoteDate: "",
    shareType: "",
    dailyVolume: "",
    Week52Variation: "",
    minVariation: "",
    maxVariation: "",
    VPA: "",
    LPA: "",
    dayVariation: "",
    monthVariation: "",
    variation30Days: "",
    variation12Months: "",
    variation2018: "",
    variation2017: "",
    variation2016: "",
    variation2015: "",
    variation2014: "",
    variation2013: "",
  },
  valuationIndicators: {
    P_L: "",
    P_VP: "",
    P_EBIT: "",
    PSR: "",
    priceToAssets: "",
    priceToLiquidAssets: "",
    dividendYield: "",
    EV_EBITDA: "",
    EV_EBIT: "",
    priceToWorkingCapital: "",
  },
  profitabilityIndicators: {
    ROE: "",
    ROIC: "",
    EBITToAssets: "",
    revenueGrowth: "",
    assetTurnover: "",
    grossMargin: "",
    EBITMargin: "",
    netMargin: "",
  },
  debtIndicators: {
    currentLiquidity: "",
    grossDebtToEquity: "",
    netDebtToEquity: "",
    netDebtToEBITDA: "",
    equityToAssets: "",
  },
  balanceSheet: {
    totalAssets: "",
    currentAssets: "",
    cashAndCashEquivalents: "",
    grossDebt: "",
    netDebt: "",
    equity: "",
  },
  incomeStatement: {
    last12Months: {
      netRevenue: "",
      EBIT: "",
      netIncome: "",
    },
    last3Months: {
      netRevenue: "",
      EBIT: "",
      netIncome: "",
    },
  },
};
