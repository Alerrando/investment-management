"use client";
import { DollarSign, Globe, MapPinHouse, Medal, Search } from "lucide-react";
import Image from "next/image";

import RankingCard from "@/components/RankingCard/RankingCard";
import RankingCardFiis from "@/components/RankingCard/RankingCardFB/RankingCardFiis/RankingCardFiis";
import RankingCardCryptoMoreVisited from "@/components/RankingCard/RankingCardICrypto/RankingCardCryptoMoreVisited/RankingCardCryptoMoreVisited";
import RankingCardCryptosRise from "@/components/RankingCard/RankingCardICrypto/RankingCardCryptosRise/RankingCardCryptosRise";
import RankingCardICrypto from "@/components/RankingCard/RankingCardICrypto/RankingCardICrypto";
import Title from "@/components/Title/Title";
import { useListCrypto } from "@/provider/Lists/ListCryptoProvider";
import { useListFiis } from "@/provider/Lists/ListFiisProvider";
import { useListStocks } from "@/provider/Lists/ListStockProvider";

export default function Home() {
  const { dataListStocks } = useListStocks();
  const { dataListCrypto, isLoadingListCrypto } = useListCrypto();
  const { dataListFiis } = useListFiis();

  return (
    <div className="flex w-full flex-col gap-8 md:gap-16">
      <main className="relative flex h-[calc(46vh-_53px)] w-full flex-col items-start justify-end gap-10 px-4 md:h-[calc(65vh-_53px)] md:gap-20 md:px-16">
        <Image
          src="/Group 15.png"
          alt=""
          className="left-[auto!important] right-[0%!important] z-0 !h-[16rem] !w-[14rem] md:!h-[42.25rem] md:!w-[40.625rem]"
          fill
        />

        <div className="z-20 flex w-full flex-col gap-5">
          <div className="flex w-full flex-col gap-1">
            <h1 className="m-0 w-full text-[1.6rem] font-semibold text-primary-t md:w-9/12 md:text-[3.5rem] md:leading-[4rem]">
              Construa Seu Futuro Financeiro com Sabedoria
            </h1>
            <span className="w-full text-sm text-primary-t/60 md:w-1/2 md:text-xl">
              Invista com confiança, transforme seu futuro financeiro e alcance seus objetivos com inteligência e
              segurança.
            </span>
          </div>

          <div className="flex w-full items-center rounded-full border border-border px-4 py-1.5 md:w-1/3">
            <input
              type="text"
              placeholder="Buscar Ativo"
              className="w-full border-none bg-transparent text-base text-primary-t outline-none"
            />

            <Search size={16} className="text-primary-t" />
          </div>
        </div>
      </main>

      <section className="grid w-full gap-3 px-4 md:w-11/12 md:px-16">
        <Title name="Rankings de Ativos" icon={<Medal size={20} className="text-primary-t" />} />
        <div className="flex w-full flex-col items-center justify-between gap-6 md:flex-row md:gap-3">
          <RankingCard
            title="New Rankings"
            data={
              dataListStocks.content.length === 0
                ? []
                : dataListStocks.content.filter((_: any, index: number) => index < 4)
            }
            onViewAll={() => console.log("Clicked!")}
            styleRankingCard="w-full md:w-[30%]"
          />
          <RankingCard
            title="New Rankings"
            data={
              dataListStocks.content.length === 0
                ? []
                : dataListStocks.content.filter((_: any, index: number) => index < 4)
            }
            onViewAll={() => console.log("Clicked!")}
            styleRankingCard="w-full md:w-[30%]"
          />
          <RankingCard
            title="New Rankings"
            data={
              dataListStocks.content.length === 0
                ? []
                : dataListStocks.content.filter((_: any, index: number) => index < 4)
            }
            onViewAll={() => console.log("Clicked!")}
            styleRankingCard="w-full md:w-[30%]"
          />
        </div>
      </section>

      <section className="flex h-auto w-full flex-col gap-3 px-4 md:w-11/12 md:px-16">
        <Title name="Rankings de Criptos" icon={<DollarSign size={20} className="text-primary-t" />} />
        <div className="flex h-full w-full flex-wrap items-start justify-start gap-3">
          <div className="flex w-full flex-col items-center justify-between gap-3 md:flex-row">
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
              styleRankingCard="w-full md:w-[65%]"
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
              styleRankingCard="w-full md:w-[30%] h-[242px] overflow-auto"
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

      <div className="flex h-full w-full flex-col items-start justify-between gap-3 px-4 pb-8 md:w-11/12 md:flex-row md:px-16">
        <section className="flex h-full w-full flex-wrap items-start justify-start gap-3 md:w-[60%]">
          <Title name="Rankings de FIIs" icon={<MapPinHouse size={20} className="text-primary-t" />} />
          <div className="flex w-full items-center justify-between">
            <RankingCardFiis
              title="FIIs Markets"
              data={
                (dataListFiis.content as any)?.content?.length === 0 || dataListFiis?.content.length === 0
                  ? []
                  : !Array.isArray(dataListFiis.content)
                    ? (dataListFiis.content as any)?.content?.filter((_: any, index: number) => index < 4)
                    : dataListFiis?.content.filter((_: any, index: number) => index < 4)
              }
              onViewAll={() => console.log("Clicked!")}
            />
          </div>
        </section>
        <section className="flex h-full w-full flex-wrap items-start justify-start gap-3 md:w-[35%]">
          <Title name="Rankings de BDRs" icon={<Globe size={20} className="text-primary-t" />} />
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
        </section>
      </div>
    </div>
  );
}
