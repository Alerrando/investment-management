import { api } from "@/lib/utils";
import { ListCryptoModel } from "@/models/Lists/ListCryptoModel";

export async function postRecommendationCrypto(crypto: ListCryptoModel[]) {
  const response = await api.post("http://localhost:8080/coins", crypto, {
    withCredentials: false,
  });

  return response.data;
}
