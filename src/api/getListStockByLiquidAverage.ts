import { api } from "@/lib/utils";

export async function getListStockByLiquidAverage() {
  const response = await api.get(`http://localhost:8080/stock/find/liquid-average`, {
    withCredentials: false,
  });

  return response.data;
}
