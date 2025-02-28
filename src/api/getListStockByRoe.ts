import { api } from "@/lib/utils";

export async function getListStockByRoe() {
  const response = await api.get(`http://localhost:8080/stock/find/roe`, {
    withCredentials: false,
  });

  return response.data;
}
