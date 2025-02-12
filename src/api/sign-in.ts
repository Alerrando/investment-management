import { api } from "@/lib/utils";

export interface SignInProps {
  email: string;
}

export async function signIn(params: SignInProps) {
  const response = await api.post("http://localhost:8080/auth/login", params, {
    withCredentials: false,
  });

  return response.data;
}
