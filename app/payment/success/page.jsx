"use client";

import { useEffect, useState } from "react";
import { useRouter }           from "next/navigation";
import { signIn }              from "next-auth/react";
import { motion }              from "framer-motion";

export default function SuccessPage() {
  const router = useRouter();
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");
  const [provider, setProvider]   = useState(null);

  useEffect(() => {
    const params = new URL(window.location.href).searchParams;
    const sid = params.get("session_id");
    if (!sid) {
      setError("Falta session_id en la URL");
      setLoading(false);
      return;
    }

    fetch(`/api/stripe/verify?session_id=${sid}`)
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          setProvider(data.provider);
        } else {
          setError(data.error || "Verificación fallida");
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Verificando suscripción…
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900 p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white bg-opacity-10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl text-center max-w-md"
      >
        {error ? (
          <>
            <h1 className="text-3xl text-red-500 mb-4">¡Ups!</h1>
            <p className="text-white mb-6">{error}</p>
            <button
              onClick={() => router.replace("/")}
              className="bg-orange-500 hover:bg-orange-700 text-white px-6 py-3 rounded"
            >
              Volver al inicio
            </button>
          </>
        ) : provider === "google" ? (
          <>
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 mb-4">
              ¡Listo!
            </h1>
            <p className="text-white mb-6">
              Tu suscripción está activa. Inicia sesión con tu cuenta de Google:
            </p>
            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="bg-orange-500 hover:bg-orange-700 text-white px-6 py-3 rounded"
            >
              Iniciar sesión con Google
            </button>
          </>
        ) : (
          <>
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 mb-4">
              ¡Bienvenido a MedxProapp!
            </h1>
            <p className="text-white mb-6">
              ¡Tu suscripción está activa y ya puedes acceder!
            </p>
            <button
              onClick={() => router.replace("/Login")}
              className="bg-orange-500 hover:bg-orange-700 text-white px-6 py-3 rounded"
            >
              Entrar a la plataforma
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}
