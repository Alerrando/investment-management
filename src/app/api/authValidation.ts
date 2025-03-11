import { api } from "@/lib/utils";

export async function authValidation() {
  const response = await api.get(`http://localhost:8080/auth/magic/token`, {
    withCredentials: true,
  });

  return response.data;
}
