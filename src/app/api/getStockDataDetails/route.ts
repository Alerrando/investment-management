"use server";
import { NextResponse } from "next/server";
import { chromium } from "playwright";

import { StockDetailsModel } from "@/models/StockDetailsModel";

export async function GET(request: Request) {
  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    const { searchParams } = new URL(request.url);
    const stock = searchParams.get("stock");
    const url = `https://www.fundamentus.com.br/detalhes.php?papel=${stock}&interface=classic&interface=mobile`;

    await page.goto(url, { waitUntil: "domcontentloaded" });

    await page.waitForTimeout(3000);

    const stockData = await page.evaluate(() => {
      const dataValues = document.querySelectorAll(".data-value");
      const dtValues = document.querySelectorAll(".dt-value");

      const financialData: StockDetailsModel = {
        marketData: {
          marketValue: dataValues[0]?.textContent?.replace("R$ ", "") || "0",
          firmValue: dataValues[1]?.textContent?.replace("R$ ", "") || "0",
          shares: dataValues[2]?.textContent || "0",
          lastBalanceDate: dataValues[3]?.textContent || "",
          sector: dataValues[4]?.textContent || "",
          subSector: dataValues[5]?.textContent || "",
          quote: dataValues[6]?.textContent?.replace("R$", "") || "0",
          lastQuoteDate: dataValues[7]?.textContent?.trim() || "",
          shareType: dataValues[8]?.textContent || "",
          dailyVolume: dataValues[9]?.textContent?.replace("R$ ", "") || "0",
          Week52Variation: dataValues[10]?.textContent?.replace("R$ ", "") || "0",
          minVariation: dataValues[12]?.textContent?.replace("R$ ", "") || "0",
          maxVariation: dataValues[13]?.textContent?.replace("R$ ", "") || "0",
          VPA: dataValues[10]?.textContent || "0",
          LPA: dataValues[11]?.textContent || "0",
          dayVariation: dataValues[16].textContent?.trim().replace(" %", "") || "0",
          monthVariation: dataValues[17].textContent?.trim().replace(" %", "") || "0",
          variation30Days: dataValues[18].textContent?.trim().replace(" %", "") || "0",
          variation12Months: dataValues[19].textContent?.trim().replace(" %", "") || "0",
          variation2018: dataValues[20].textContent?.trim().replace(" %", "") || "0",
          variation2017: dataValues[21].textContent?.trim().replace(" %", "") || "0",
          variation2016: dataValues[22].textContent?.trim().replace(" %", "") || "0",
          variation2015: dataValues[23].textContent?.trim().replace(" %", "") || "0",
          variation2014: dataValues[24].textContent?.trim().replace(" %", "") || "0",
          variation2013: dataValues[25].textContent?.trim().replace(" %", "") || "0",
        },
        valuationIndicators: {
          P_L: dataValues[26].textContent || "0",
          P_VP: dataValues[27].textContent || "0",
          P_EBIT: dataValues[28].textContent || "0",
          PSR: dataValues[29].textContent || "0",
          priceToAssets: dataValues[30].textContent || "0",
          priceToLiquidAssets: dataValues[31].textContent || "0",
          dividendYield: dataValues[32].textContent?.replace(" %", "") || "0",
          EV_EBITDA: dataValues[33].textContent || "0",
          EV_EBIT: dataValues[34].textContent || "0",
          priceToWorkingCapital: dataValues[35].textContent || "0",
        },
        profitabilityIndicators: {
          ROE: dataValues[36].textContent?.replace("%", "") || "0",
          ROIC: dataValues[37].textContent?.replace("%", "") || "0",
          EBITToAssets: dataValues[38].textContent || "0",
          revenueGrowth: dataValues[39].textContent?.replace("% ", "") || "0",
          assetTurnover: dataValues[40].textContent || "0",
          grossMargin: dataValues[41].textContent?.replace("% ", "") || "0",
          EBITMargin: dataValues[42].textContent?.replace("% ", "") || "0",
          netMargin: dataValues[43].textContent?.replace("% ", "") || "0",
        },
        debtIndicators: {
          currentLiquidity: dataValues[44]?.textContent || "0",
          grossDebtToEquity: dataValues[45]?.textContent || "0",
          netDebtToEquity: dataValues[46]?.textContent || "0",
          netDebtToEBITDA: dataValues[47]?.textContent || "0",
          equityToAssets: dataValues[48]?.textContent || "0",
        },
        balanceSheet: {
          totalAssets: dataValues[49]?.textContent?.replace("R$ ", "") || "0",
          currentAssets: dataValues[50]?.textContent?.replace("R$ ", "") || "0",
          cashAndCashEquivalents: dataValues[51]?.textContent?.replace("R$ ", "") || "0",
          grossDebt: dataValues[52]?.textContent?.replace("R$ ", "") || "0",
          netDebt: dataValues[53]?.textContent?.replace("R$ ", "") || "0",
          equity: dataValues[54]?.textContent?.replace("R$ ", "") || "0",
        },
        incomeStatement: {
          last12Months: {
            netRevenue: dtValues[0].textContent?.replace("R$ ", "") || "0",
            EBIT: dtValues[2].textContent?.replace("R$ ", "") || "0",
            netIncome: dtValues[4].textContent?.replace("R$ ", "") || "0",
          },
          last3Months: {
            netRevenue: dtValues[1].textContent?.replace("R$ ", "") || "0",
            EBIT: dtValues[3].textContent?.replace("R$ ", "") || "0",
            netIncome: dtValues[5].textContent?.replace("R$ ", "") || "0",
          },
        },
      };
      return financialData;
    });

    await browser.close();

    return NextResponse.json(stockData);
  } catch (error) {
    console.log(error);
  }
}
