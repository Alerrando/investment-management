import { api } from "@/lib/utils";

export async function getListStockByPl() {
  const response = await api.get(`http://localhost:8080/stock/find/pl`, {
    withCredentials: false,
  });

  return response.data;
}
