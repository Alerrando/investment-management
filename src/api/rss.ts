"use server";
import { chromium } from "playwright";

export default async function handler() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // URL para realizar o scraping
  const url = "https://www.fundamentus.com.br/detalhes.php?papel=MNSA4&interface=classic&interface=mobile";

  await page.goto(url);

  await page.waitForTimeout(3000);

  const stockData = await page.evaluate(() => {
    const dataValues = document.querySelectorAll(".data-value");
    const values = Array.from(dataValues).map((div) => div?.textContent?.trim());
    return values;
  });

  await browser.close();

  // Log para verificar os dados
  console.log("Dados capturados:", stockData);

  return {
    stockData,
  };
}
