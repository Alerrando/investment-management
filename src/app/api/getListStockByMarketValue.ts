import { api } from "@/lib/utils";

export async function getListStockByMarketValue() {
  const response = await api.get(`http://localhost:8080/stock/find/market-value`, {
    withCredentials: false,
  });

  return response.data;
}
