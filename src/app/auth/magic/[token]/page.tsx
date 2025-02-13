"use client";
import { useParams } from "next/navigation";
import { useEffect } from "react";

import { useValidationAuth } from "@/provider/ValidationAuthProvider";

export default function MagicLinkPage() {
  const { token } = useParams();
  const { setToken } = useValidationAuth();

  useEffect(() => {
    if (token) {
      setToken(token);
    }
  }, []);

  return (
    <div>
      <h1>Validando Magic Link</h1>
      {token ? <p>Token: {token}</p> : <p>Carregando...</p>}
    </div>
  );
}
