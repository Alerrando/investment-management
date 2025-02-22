import { api } from "@/lib/utils";

export async function getListStockByDividend() {
  const response = await api.get(`http://localhost:8080/stock/dividend`, {
    withCredentials: false,
  });

  return response.data;
}
