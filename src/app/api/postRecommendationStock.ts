import { api } from "@/lib/utils";
import { ListStockModelContent } from "@/models/Lists/ListStockModel";

export async function postRecommendationStock(stocks: ListStockModelContent[]) {
  const response = await api.post(`http://localhost:8080/stock`, stocks, {
    withCredentials: false,
  });

  return response.data;
}
