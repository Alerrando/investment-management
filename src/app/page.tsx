"use client";
import { DollarSign, Globe, MapPinHouse, Medal, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import RankingCard from "@/components/RankingCard/RankingCard";
import RankingCardFiis from "@/components/RankingCard/RankingCardFB/RankingCardFiis/RankingCardFiis";
import RankingCardCryptoMoreVisited from "@/components/RankingCard/RankingCardICrypto/RankingCardCryptoMoreVisited/RankingCardCryptoMoreVisited";
import RankingCardCryptosRise from "@/components/RankingCard/RankingCardICrypto/RankingCardCryptosRise/RankingCardCryptosRise";
import RankingCardICrypto from "@/components/RankingCard/RankingCardICrypto/RankingCardICrypto";
import Title from "@/components/Title/Title";
import { useListCrypto } from "@/provider/Lists/ListCryptoProvider";
import { useListStocks } from "@/provider/Lists/ListStockProvider";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [items, setItems] = useState<any[]>([]);
  const { dataListStocks } = useListStocks();
  const { dataListCrypto, isLoadingListCrypto } = useListCrypto();

  return (
    <div className="flex flex-col gap-16">
      <main className="relative flex h-[calc(65vh-_53px)] w-full flex-col items-start justify-end gap-20 px-16">
        <Image
          src="/Group 15.png"
          alt=""
          className="left-[auto!important] right-[0%!important] z-0 h-[42.25rem!important] w-[40.625rem!important]"
          fill
        />

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h1 className="m-0 w-9/12 text-[3.5rem] font-semibold leading-[4rem] text-primary-t">
              Construa Seu Futuro Financeiro com Sabedoria
            </h1>
            <span className="w-1/2 text-xl text-primary-t/60">
              Invista com confiança, transforme seu futuro financeiro e alcance seus objetivos com inteligência e
              segurança.
            </span>
          </div>

          <div className="ronuded-full flex w-1/3 items-center rounded-full border border-border px-4 py-1.5">
            <input
              type="text"
              placeholder="Buscar Ativo"
              className="w-full border-none bg-transparent text-base outline-none"
            />

            <Search size={16} className="text-primary-t" />
          </div>
        </div>
      </main>

      <section className="grid w-11/12 gap-3 px-16">
        <Title name="Rankings de Ativos" icon={<Medal size={20} className="text-primary-t" />} />
        <div className="flex w-full items-center justify-between">
          <RankingCard
            title="New Rankings"
            data={
              dataListStocks?.content?.length === 0 || (dataListStocks?.content as any)?.content?.length === 0
                ? []
                : !Array.isArray(dataListStocks.content)
                  ? (dataListStocks?.content as any)?.content?.filter((_: any, index: number) => index < 4)
                  : dataListStocks?.content?.filter((_: any, index: number) => index < 4)
            }
            onViewAll={() => console.log("Clicked!")}
            styleRankingCard="w-[30%]"
          />
          <RankingCard
            title="New Rankings"
            data={
              dataListStocks?.content?.length === 0 || (dataListStocks?.content as any)?.content?.length === 0
                ? []
                : !Array.isArray(dataListStocks.content)
                  ? (dataListStocks?.content as any)?.content?.filter((_: any, index: number) => index < 4)
                  : dataListStocks?.content?.filter((_: any, index: number) => index < 4)
            }
            onViewAll={() => console.log("Clicked!")}
            styleRankingCard="w-[30%]"
          />
          <RankingCard
            title="New Rankings"
            data={
              dataListStocks?.content?.length === 0 || (dataListStocks?.content as any)?.content?.length === 0
                ? []
                : !Array.isArray(dataListStocks.content)
                  ? (dataListStocks?.content as any)?.content?.filter((_: any, index: number) => index < 4)
                  : dataListStocks?.content?.filter((_: any, index: number) => index < 4)
            }
            onViewAll={() => console.log("Clicked!")}
            styleRankingCard="w-[30%]"
          />
        </div>
      </section>

      <section className="flex h-auto w-11/12 flex-col gap-3 px-16">
        <Title name="Rankings de Criptos" icon={<DollarSign size={20} className="text-primary-t" />} />
        <div className="flex h-full w-full flex-wrap items-start justify-start gap-3">
          <div className="flex w-full items-center justify-between">
            <RankingCardCryptosRise
              title="Cryptos em Alta"
              data={
                (dataListCrypto as any)?.content?.length === 0 || dataListCrypto?.length === 0
                  ? []
                  : !Array.isArray(dataListCrypto)
                    ? (dataListCrypto as any)?.content?.filter((_: any, index: number) => index < 4)
                    : dataListCrypto?.filter((_: any, index: number) => index < 4)
              }
              onViewAll={() => console.log("Clicked!")}
              styleRankingCard="w-[65%]"
            />

            <RankingCardICrypto
              title="Crypto Mais Visitados"
              data={
                (dataListCrypto as any)?.content?.length === 0 || dataListCrypto?.length === 0
                  ? []
                  : !Array.isArray(dataListCrypto)
                    ? (dataListCrypto as any)?.content?.filter((_: any, index: number) => index < 4)
                    : dataListCrypto?.filter((_: any, index: number) => index < 4)
              }
              onViewAll={() => console.log("Clicked!")}
              styleRankingCard="w-[30%] h-[242px] overflow-auto"
            />
          </div>

          <RankingCardCryptoMoreVisited
            title="Crypto Mais Visitados"
            data={
              (dataListCrypto as any)?.content?.length === 0 || dataListCrypto?.length === 0
                ? []
                : !Array.isArray(dataListCrypto)
                  ? (dataListCrypto as any)?.content?.filter((_: any, index: number) => index < 4)
                  : dataListCrypto?.filter((_: any, index: number) => index < 4)
            }
            onViewAll={() => console.log("Clicked!")}
            styleRankingCard="w-full"
          />
        </div>
      </section>

      <div className="flex h-full w-11/12 items-start justify-between px-16 pb-8">
        <section className="flex h-full w-[60%] flex-wrap items-start justify-start gap-3">
          <Title name="Rankings de FIIs" icon={<MapPinHouse size={20} className="text-primary-t" />} />
          <div className="flex h-full w-full flex-wrap items-start justify-start gap-3">
            <div className="flex w-full items-center justify-between">
              <RankingCardFiis
                title="FIIs Markets"
                data={
                  isLoadingListCrypto
                    ? []
                    : (dataListCrypto as any)?.content?.length === 0 || dataListCrypto?.length === 0
                      ? []
                      : !Array.isArray(dataListCrypto)
                        ? (dataListCrypto as any)?.content?.filter((_: any, index: number) => index < 4)
                        : dataListCrypto?.filter((_: any, index: number) => index < 4)
                }
                onViewAll={() => console.log("Clicked!")}
              />
            </div>
          </div>
        </section>
        <section className="flex h-full w-[35%] flex-wrap items-start justify-start gap-3">
          <Title name="Rankings de BDRs" icon={<Globe size={20} className="text-primary-t" />} />
          <div className="flex h-full w-full flex-wrap items-start justify-start gap-3">
            <div className="flex w-full items-center justify-between">
              <RankingCardFiis
                title="BDRs Mais Visitados"
                data={
                  isLoadingListCrypto
                    ? []
                    : (dataListCrypto as any)?.content?.length === 0 || dataListCrypto?.length === 0
                      ? []
                      : !Array.isArray(dataListCrypto)
                        ? (dataListCrypto as any)?.content?.filter((_: any, index: number) => index < 4)
                        : dataListCrypto?.filter((_: any, index: number) => index < 4)
                }
                onViewAll={() => console.log("Clicked!")}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
