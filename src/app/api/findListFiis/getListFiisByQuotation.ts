import { api } from "@/lib/utils";

export async function getListFiisByQuotation() {
  const response = await api.get(`http://localhost:8080/fiis/find/quotation`, {
    withCredentials: false,
  });

  return response.data;
}
