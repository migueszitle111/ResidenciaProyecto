// ===== File: app/payment/success/page.jsx =====
"use client";

import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function SuccessPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'authenticated') {
      router.replace('/');
    } else {
      signIn('google', { callbackUrl: '/', prompt: 'none' });
    }
  }, [status, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900 p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white bg-opacity-10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl text-center max-w-md"
      >
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 mb-4">
          ¡Bienvenido a MedxProapp!
        </h1>
        <p className="text-white mb-6">Redirigiéndote a la plataforma...</p>
      </motion.div>
    </div>
  );
}
