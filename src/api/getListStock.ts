import { api } from "@/lib/utils";

export async function getListStock() {
  const response = await api.get(`http://localhost:8080/stock`, {
    withCredentials: false,
  });

  return response.data;
}
