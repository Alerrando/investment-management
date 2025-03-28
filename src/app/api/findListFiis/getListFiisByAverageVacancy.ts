import { api } from "@/lib/utils";

export async function getListFiisByAverageVacancy() {
  const response = await api.get(`http://localhost:8080/fiis/find/average-vacancy`, {
    withCredentials: false,
  });

  return response.data;
}
