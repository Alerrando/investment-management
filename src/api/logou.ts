import { api } from "@/lib/utils";

export async function logout() {
  const response = await api.post(
    "http://localhost:8080/auth/logout",
    {},
    {
      withCredentials: true,
    },
  );

  return response.data;
}
