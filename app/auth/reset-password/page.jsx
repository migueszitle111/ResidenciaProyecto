// app/auth/reset-password/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const router = useRouter();
  const token  = params.get("token");

  const [pw, setPw]       = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [ok, setOk]       = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (pw !== confirm) return setError("Las contraseñas no coinciden");
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({ token, password: pw })
    });
    const data = await res.json();
    if (data.ok) setOk(true);
    else setError(data.error);
  }

  if (ok) {
    return (
      <div className="p-8 max-w-md mx-auto">
        <h1>Contraseña actualizada</h1>
        <button onClick={()=>router.push("/Login")}>
          Inicia sesión con tu nueva contraseña
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-md mx-auto">
      <h1>Crear nueva contraseña</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="password"
        placeholder="Nueva contraseña"
        value={pw}
        onChange={e=>setPw(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirma contraseña"
        value={confirm}
        onChange={e=>setConfirm(e.target.value)}
        required
      />
      <button type="submit">Guardar contraseña</button>
    </form>
  );
}
