import { api } from "@/lib/utils";

export async function getListFiis() {
  const response = await api.get(`http://localhost:8080/fiis`, {
    withCredentials: false,
  });

  return response.data;
}
