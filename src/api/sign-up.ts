import { api } from "@/lib/utils";

type SignUpProps = {
  name: string;
  email: string;
};

export async function signUp(params: SignUpProps) {
  const response = await api.post("http://localhost:8080/auth/register", params, {
    withCredentials: false,
  });

  return response.data;
}
