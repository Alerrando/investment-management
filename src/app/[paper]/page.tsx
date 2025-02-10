"use client";
import { Globe, Medal, Search } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Footer } from "@/components/Footer/Footer";
import RankingCard from "@/components/RankingCard/RankingCard";
import Title from "@/components/Title/Title";

export default function StockDetail() {
  const { stockId } = useParams();
  const [stockData, setStockData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStockData = async () => {
      setIsLoading(true);
      const mockData = {
        stock: "HAPV3",
        name: "HAPVIDA",
        close: 2.21,
        change: -0.896860986547086,
        volume: 27813000,
        market_cap: 16801583439.999998,
        logo: "https://s3-symbol-logo.tradingview.com/hapvida--big.svg",
        sector: "Health Services",
        type: "stock",
        description:
          "Hapvida é uma empresa brasileira de saúde que oferece planos de saúde, odontológicos e serviços médicos.",
        historicalData: [
          { date: "2023-10-01", price: 2.3 },
          { date: "2023-10-02", price: 2.25 },
          { date: "2023-10-03", price: 2.2 },
          { date: "2023-10-04", price: 2.21 },
        ],
        financialData: {
          paper: "HAPV3",
          quotation: "R$ 2.21",
          pL: "20.3",
          pVp: "1.5",
          psr: "1.1",
          dividend: "3.5%",
          pActive: "10.5",
          pWorkCapital: "5.5",
          pEbit: "8.4",
          pLiquidCurrentAssets: "12.5",
          evEbit: "7.8",
          evEbitda: "6.3",
          ebitMargin: "15%",
          liquidMargin: "10%",
          liquidCurrent: "1.5",
          roic: "13%",
          roe: "9%",
          liquid2Month: "20%",
          liquidWorth: "R$ 30B",
          liquidDebtEquity: "0.4",
          revenueGrowth5Years: "10%",
          liquityDebtEbitida: "2.1",
          marketValue: "R$ 16B",
        },
      };
      setStockData(mockData);
      setIsLoading(false);
    };

    fetchStockData();
  }, [stockId]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!stockData) {
    return <div>Stock não encontrado</div>;
  }

  return (
    <div className={`flex h-auto flex-col gap-16 bg-white pt-8 text-gray-900 dark:bg-gray-900 dark:text-white`}>
      <main className="relative flex w-full flex-col items-start justify-start gap-20 px-16">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h1 className="m-0 text-[3.5rem] font-semibold leading-[4rem] text-indigo-600 dark:text-indigo-400">
              {stockData.name} ({stockData.stock})
            </h1>
            <span className="w-1/2 text-xl text-[#8B8B8B] dark:text-[#B8B8B8]">
              {stockData.description || "Descrição da ação não disponível."}
            </span>
          </div>

          <div className="flex w-1/3 items-center rounded-full border border-zinc-700 px-4 py-1.5 dark:border-zinc-300">
            <input
              type="text"
              placeholder="Buscar Ativo"
              className="w-full border-none bg-transparent text-base outline-none dark:text-white"
            />
            <Search size={16} className="text-gray-600 dark:text-gray-300" />
          </div>
        </div>

        <section className="grid w-full gap-3">
          <Title
            name="Informações do Stock"
            icon={<Medal size={20} className="text-indigo-600 dark:text-indigo-400" />}
          />
          <div className="flex w-full items-center justify-between gap-3">
            <div className="w-[65%] rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">Informações Gerais</h2>
              <div className="mt-3 flex flex-col gap-4 text-gray-700 dark:text-gray-300">
                <p>
                  <strong>Preço Atual:</strong> R$ {stockData.close}
                </p>
                <p>
                  <strong>Variação (%):</strong> {stockData.change * 100}%
                </p>
                <p>
                  <strong>Volume:</strong> {stockData.volume.toLocaleString()}
                </p>
                <p>
                  <strong>Capitalização de Mercado:</strong> R$ {stockData.market_cap.toLocaleString()}
                </p>
                <p>
                  <strong>Setor:</strong> {stockData.sector}
                </p>
                <p>
                  <strong>Tipo:</strong> {stockData.type}
                </p>
              </div>
            </div>

            <div className="w-[30%] rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
              <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">Gráfico de Preço</h2>
              <div className="mt-4 h-[250px] bg-gray-200 dark:bg-gray-700">Gráfico de Preço Aqui</div>
            </div>
          </div>
        </section>

        <section className="grid w-full gap-3">
          <Title
            name="Indicadores Financeiros"
            icon={<Globe size={20} className="text-indigo-600 dark:text-indigo-400" />}
          />
          {stockData.financialData ? (
            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(stockData.financialData).map(([key, value]: string) => (
                <div key={key} className="rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
                  <h3 className="text-lg font-semibold capitalize text-indigo-600 dark:text-indigo-400">
                    {key.replace(/([A-Z])/g, " $1")}
                  </h3>
                  <p className="text-xl font-bold text-gray-700 dark:text-gray-300">{value}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-red-500">Informações financeiras não disponíveis.</div>
          )}
        </section>

        <section className="grid w-full gap-3">
          <Title
            name="Comparativo com Outros Ativos"
            icon={<Globe size={20} className="text-indigo-600 dark:text-indigo-400" />}
          />
          <div className="flex flex-wrap gap-3">
            <RankingCard
              title="Ranking de Ações"
              data={[]}
              onViewAll={() => console.log("Clicked!")}
              styleRankingCard="w-[30%]"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
