// app/success/page.jsx
"use client";

import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const { status } = useSession();
  const router     = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      <h1 className="text-4xl font-bold mb-4">¡Pago realizado correctamente!</h1>
      <p className="mb-6">Ahora ya puedes iniciar sesión y disfrutar de tu suscripción.</p>
      <button
        onClick={() => signIn(undefined, { callbackUrl: "/" })}
        className="bg-orange-500 hover:bg-orange-700 text-white px-6 py-3 rounded"
      >
        Iniciar sesión
      </button>
    </div>
  );
}
