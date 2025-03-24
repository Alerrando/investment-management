import { api } from "@/lib/utils";

export async function getListFiisByDividend() {
  const response = await api.get(`http://localhost:8080/fiis/find/dividend`, {
    withCredentials: false,
  });

  return response.data;
}
