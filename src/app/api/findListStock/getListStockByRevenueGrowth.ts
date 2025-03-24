import { api } from "@/lib/utils";

export async function getListStockByMarketValueRevenueGrowth() {
  const response = await api.get(`http://localhost:8080/stock/find/revenue-growth`, {
    withCredentials: false,
  });

  return response.data;
}
