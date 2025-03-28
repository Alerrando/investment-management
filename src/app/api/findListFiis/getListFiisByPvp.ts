import { api } from "@/lib/utils";

export async function getListFiisByPVP() {
  const response = await api.get(`http://localhost:8080/fiis/find/pvp`, {
    withCredentials: false,
  });

  return response.data;
}
