import { api } from "@/lib/utils";

export async function getListFiisByMarketValue() {
  const response = await api.get(`http://localhost:8080/fiis/find/market-value`, {
    withCredentials: false,
  });

  return response.data;
}
