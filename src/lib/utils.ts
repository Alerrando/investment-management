import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { ListFiisModel } from "@/models/Lists/ListFiisModel";
import { ListStockModel } from "@/models/Lists/ListStockModel";
import { StockDetailsModel } from "@/models/StockDetailsModel";
import { StockShareholdersModel } from "@/models/StockShareholdersModel";

export const api = axios.create();

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

api.interceptors.request.use(async (config) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return config;
});

export function hexToHsl(hex: string): string {
  hex = hex.replace("#", "");

  const r: number = parseInt(hex.slice(0, 2), 16) / 255;
  const g: number = parseInt(hex.slice(2, 4), 16) / 255;
  const b: number = parseInt(hex.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let lightness = (max + min) / 2;

  let hue: number = 0;
  let saturation: number = 0;

  if (delta !== 0) {
    saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    if (max === r) {
      hue = (g - b) / delta + (g < b ? 6 : 0);
    } else if (max === g) {
      hue = (b - r) / delta + 2;
    } else {
      hue = (r - g) / delta + 4;
    }
    hue *= 60;
  }

  saturation *= 100;
  lightness *= 100;

  return `${Math.round(hue)} ${Math.round(saturation)}% ${Math.round(lightness)}%`;
}

export function hslToHex(hsl: string): string {
  const [hue, saturation, lightness] = hsl
    .split(" ")
    .map((val, index) => (index === 0 ? parseFloat(val) : parseFloat(val) / 100));

  const c = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = lightness - c / 2;

  let r: number, g: number, b: number;

  if (hue >= 0 && hue < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (hue >= 60 && hue < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (hue >= 120 && hue < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (hue >= 180 && hue < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (hue >= 240 && hue < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  // Add the m offset
  r += m;
  g += m;
  b += m;

  // Convert RGB to hex
  const toHex = (value: number) =>
    Math.round(value * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

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

export const initialStateStockShareholdersDetails: StockShareholdersModel[] = [] as StockShareholdersModel[];
