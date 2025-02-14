import { api } from "@/lib/utils";

export async function authValidation() {
  const response = await api.get(`http://localhost:8080/auth/token`, {
    withCredentials: false,
  });

  return response.data;
}
