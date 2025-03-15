"use server";
import { NextResponse } from "next/server";
import { chromium } from "playwright";

import { StockShareholdersModel } from "@/models/StockShareholdersModel";

export async function GET(request: Request) {
  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    const { searchParams } = new URL(request.url);
    const stock = searchParams.get("stock");
    const url = `https://www.fundamentus.com.br/principais_acionistas.php?papel=${stock}&interface=classic&interface=mobile`;

    await page.goto(url, { waitUntil: "domcontentloaded" });

    await page.waitForTimeout(1000);

    const stockData = await page.evaluate(() => {
      const tbodys = document.querySelectorAll("tbody");

      const shareholderData: StockShareholdersModel = {
        commonShares: [],
        totalCapital: [],
      };

      tbodys.forEach((tbody, index) => {
        const rows = tbody.querySelectorAll("tr");
        rows.forEach((row) => {
          const columns = row.querySelectorAll("td");

          const aux = {
            name: columns[0].textContent?.trim() || "",
            percentage: columns[1].textContent?.trim() || "",
          };
          shareholderData[index === 0 ? "commonShares" : "totalCapital"].push(aux);
        });
      });

      return shareholderData;
    });

    await browser.close();

    return NextResponse.json(stockData);
  } catch (error) {
    console.log(error);
  }
}
