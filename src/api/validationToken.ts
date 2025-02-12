import { api } from "@/lib/utils";

interface VakidationTokenProps {
  token: string;
}

export async function validationToken({ token }: VakidationTokenProps) {
  const response = await api.get(`http://localhost:8080/auth/token=${token}`, {
    withCredentials: false,
  });

  return response.data;
}
