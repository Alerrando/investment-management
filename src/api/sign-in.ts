import { api } from "@/lib/utils";

export interface SignInProps {
  email: string;
}

export async function signIn(email: SignInProps) {
  console.log(email);
  const response = await api.post("http://localhost:8080/auth/login", email, {
    withCredentials: false,
  });

  return response.data;
}
