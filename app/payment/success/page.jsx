"use client";

import { useEffect, useState } from "react";
import { signIn }              from "next-auth/react";
import { motion }              from "framer-motion";

export default function SuccessPage() {
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");
  const [provider, setProvider] = useState(null);

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
        if (!data.ok) throw new Error(data.error || "Verificación fallida");
        setProvider(data.provider);
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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <h1 className="text-3xl text-red-500 mb-4">¡Ups!</h1>
        <p className="mb-6">{error}</p>
        <button
          onClick={() => window.close()}
          className="bg-orange-500 hover:bg-orange-700 text-white px-6 py-3 rounded"
        >
          Cerrar
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900 p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative flex flex-col items-center bg-white bg-opacity-10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl text-center max-w-md w-full"
      >
        <button
          onClick={() => window.close()}
          className="absolute top-3 right-3 text-white text-2xl hover:text-gray-300"
          aria-label="Cerrar"
        >
          ✕
        </button>

        {provider === "google" ? (
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
              ¡Bienvenido a mEDXproapp!
            </h1>
            <p className="text-white mb-6">
              Acabamos de enviarte un correo para crear tu contraseña.
              Una vez la asignes, vuelve aquí y pulsa ✕ para cerrar.
            </p>
            <div className="mx-auto mt-4 text-left text-sm text-white bg-white bg-opacity-5 p-4 rounded max-w-xs">
              <p className="font-semibold mb-2">¿No ves el correo?</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Revisa tu carpeta de Spam/Basura.</li>
                <li>Si usas móvil, abre tu app de correo.</li>
                <li>Busca “MedxProapp” en el buscador de tu correo.</li>
              </ul>
              <p className="mt-4">
                Cualquier problema, escríbenos a{" "}
                <a
                  href="mailto:soporte@medxproapp.com"
                  className="text-orange-300 underline"
                >
                  soporte@medxproapp.com
                </a>.
              </p>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
