import RankingCard from "@/components/RankingCard/RankingCard";
import { useListStocksByDividend } from "@/provider/Lists/ListStockByDividendProvider";

export default function Categories() {
  const { dataListStocksByDividend } = useListStocksByDividend();

  return (
    <div className="flex w-full items-center justify-between gap-8">
      <RankingCard
        title="Ações que mais pagam dividendos"
        onViewAll={() => {}}
        styleRankingCard="w-full"
        data={dataListStocksByDividend}
      />

      <RankingCard
        title="Empresas com mais valor de mercado"
        onViewAll={() => {}}
        styleRankingCard="w-full"
        data={dataListStocksByDividend}
      />

      <RankingCard
        title="Aumento de Receita nos Últimos 5 Anos"
        onViewAll={() => {}}
        styleRankingCard="w-full"
        data={dataListStocksByDividend}
      />
    </div>
  );
}
