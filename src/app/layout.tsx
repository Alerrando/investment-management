"use client";

import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Poppins } from "next/font/google";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";

import { Footer } from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { ThemeProvider } from "@/components/theme-provider";
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
          <TanstackProvider>
            <RecommendationStocksProvider>
              <RecommendationFiisProvider>
                <RecommendationCryptoProvider>
                  <Suspense>
                    <Header />
                    {children}
                    <SpeedInsights />
                    <Analytics />

                    <ToastContainer position="bottom-right" />

                    <Footer />
                  </Suspense>
                </RecommendationCryptoProvider>
              </RecommendationFiisProvider>
            </RecommendationStocksProvider>
          </TanstackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
