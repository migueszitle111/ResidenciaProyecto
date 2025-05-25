// app/auth/reset-password/page.jsx
"use client";
import { useState, useEffect } from "react";
import { useRouter }           from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken]   = useState("");
  const [pass, setPass]     = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError]   = useState("");
  const [done, setDone]     = useState(false);

  // Al montar extraer ?token=…
  useEffect(() => {
    const t = new URL(window.location.href).searchParams.get("token");
    if (!t) setError("Falta token");
    setToken(t || "");
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    if (!pass || pass !== confirm) {
      setError("Contraseñas no coinciden");
      return;
    }
    const res = await fetch("/api/auth/reset-password", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ token, password: pass }),
    });
    if (res.ok) {
      setDone(true);
      setTimeout(()=>router.replace("/Login"), 2000);
    } else {
      const { error: msg } = await res.json();
      setError(msg);
    }
  };

  if (done) {
    return <div className="min-h-screen flex items-center justify-center">
      <h2 className="text-green-500">¡Contraseña creada! Redirigiendo…</h2>
    </div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={onSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-xl font-bold mb-4">Establece tu contraseña</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={pass}
          onChange={e=>setPass(e.target.value)}
          required
          className="w-full p-2 border mb-3"
        />
        <input
          type="password"
          placeholder="Confirma contraseña"
          value={confirm}
          onChange={e=>setConfirm(e.target.value)}
          required
          className="w-full p-2 border mb-5"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Restablecer contraseña
        </button>
      </form>
    </div>
  );
}
