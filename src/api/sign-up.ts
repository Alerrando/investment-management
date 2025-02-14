import { api } from "@/lib/utils";

export async function signUp(params: SignUpProps) {
  const response = await api.post("http://localhost:8080/auth/register", params, {
    withCredentials: false,
  });

  return response.data;
}
