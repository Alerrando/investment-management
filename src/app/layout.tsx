"use client";

import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";

import Header from "@/components/Header/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { ListCryptoProvider } from "@/provider/ListCryptoProvider";
import { ListFiisProvider } from "@/provider/ListFiisProvider";
import { ListStocksProvider } from "@/provider/ListStockProvider";
import { RecommendationCryptoProvider } from "@/provider/Recommendation/RecommendationCryptoProvider";
import { RecommendationFiisProvider } from "@/provider/Recommendation/RecommendationFiisProvider";
import { RecommendationStocksProvider } from "@/provider/Recommendation/RecommendationStockProvider";
import { TanstackProvider } from "@/provider/tanstack-provider";
import { UserProvider } from "@/provider/UserProvider";
import { ValidationAuthProvider } from "@/provider/ValidationAuthProvider";

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
          <TanstackProvider>
            <UserProvider>
              <ListCryptoProvider>
                <ListFiisProvider>
                  <ListStocksProvider>
                    <RecommendationStocksProvider>
                      <RecommendationFiisProvider>
                        <RecommendationCryptoProvider>
                          <ValidationAuthProvider>
                            <Header />
                            {children}
                            <SpeedInsights />
                            <Analytics />

                            <ToastContainer position="bottom-right" />
                          </ValidationAuthProvider>
                        </RecommendationCryptoProvider>
                      </RecommendationFiisProvider>
                    </RecommendationStocksProvider>
                  </ListStocksProvider>
                </ListFiisProvider>
              </ListCryptoProvider>
            </UserProvider>
          </TanstackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
