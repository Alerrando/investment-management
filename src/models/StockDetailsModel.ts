export type StockDetailsModel = {
  marketData: {
    marketValue: string;
    firmValue: string;
    shares: string;
    lastBalanceDate: string;
    sector: string;
    subSector: string;
    quote: string;
    lastQuoteDate: string;
    shareType: string;
    dailyVolume: string;
    Week52Variation: string;
    minVariation: string;
    maxVariation: string;
    VPA: string;
    LPA: string;
    dayVariation: string;
    monthVariation: string;
    variation30Days: string;
    variation12Months: string;
    variation2018: string;
    variation2017: string;
    variation2016: string;
    variation2015: string;
    variation2014: string;
    variation2013: string;
  };
  valuationIndicators: {
    P_L: string;
    P_VP: string;
    P_EBIT: string;
    PSR: string;
    priceToAssets: string;
    priceToLiquidAssets: string;
    dividendYield: string;
    EV_EBITDA: string;
    EV_EBIT: string;
    priceToWorkingCapital: string;
  };
  profitabilityIndicators: {
    ROE: string;
    ROIC: string;
    EBITToAssets: string;
    revenueGrowth: string;
    assetTurnover: string;
    grossMargin: string;
    EBITMargin: string;
    netMargin: string;
  };
  debtIndicators: {
    currentLiquidity: string;
    grossDebtToEquity: string;
    netDebtToEquity: string;
    netDebtToEBITDA: string;
    equityToAssets: string;
  };
  balanceSheet: {
    totalAssets: string;
    currentAssets: string;
    cashAndCashEquivalents: string;
    grossDebt: string;
    netDebt: string;
    equity: string;
  };
  incomeStatement: {
    last12Months: {
      netRevenue: string;
      EBIT: string;
      netIncome: string;
    };
    last3Months: {
      netRevenue: string;
      EBIT: string;
      netIncome: string;
    };
  };
};
