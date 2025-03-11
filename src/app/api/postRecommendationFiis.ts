import { api } from "@/lib/utils";
import { ListFiisModelContent } from "@/models/Lists/ListFiisModel";

export async function postRecommendationFiis(fiis: ListFiisModelContent[]) {
  const response = await api.post("http://localhost:8080/fiis", fiis, {
    withCredentials: false,
  });

  return response.data;
}
