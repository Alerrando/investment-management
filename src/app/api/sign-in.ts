import { api } from "@/lib/utils";

export async function signIn(email: string) {
  const response = await api.post("http://localhost:8080/auth/login", email, {
    withCredentials: true,
  });

  return response.data;
}
