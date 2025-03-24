import { api } from "@/lib/utils";

export async function getListFiisByQuantityProperty() {
  const response = await api.get(`http://localhost:8080/fii/find/quantity-property`, {
    withCredentials: false,
  });

  return response.data;
}
