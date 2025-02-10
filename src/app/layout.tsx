"use client";

import "./globals.css";

import { Poppins } from "next/font/google";

import Header from "@/components/Header/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { ListCryptoProvider } from "@/provider/ListCryptoProvider";
import { ListFiisProvider } from "@/provider/ListFiisProvider";
import { ListStocksProvider } from "@/provider/ListStockProvider";
import { RecommendationCryptoProvider } from "@/provider/Recommendation/RecommendationCryptoProvider";
import { RecommendationFiisProvider } from "@/provider/Recommendation/RecommendationFiisProvider";
import { RecommendationStocksProvider } from "@/provider/Recommendation/RecommendationStockProvider";
import { TanstackProvider } from "@/provider/tanstack-provider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={`${poppins.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          <TanstackProvider>
            <ListCryptoProvider>
              <ListFiisProvider>
                <ListStocksProvider>
                  <RecommendationStocksProvider>
                    <RecommendationFiisProvider>
                      <RecommendationCryptoProvider>{children}</RecommendationCryptoProvider>
                    </RecommendationFiisProvider>
                  </RecommendationStocksProvider>
                </ListStocksProvider>
              </ListFiisProvider>
            </ListCryptoProvider>
          </TanstackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
