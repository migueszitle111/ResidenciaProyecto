"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Overhead = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { data: session, status } = useSession();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSignOut = async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);
    setIsOpen(false);

    try {
      const response = await signOut({
        redirect: false,
        callbackUrl: "/?logout=1",
      });

      window.location.replace(response?.url || "/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      window.location.replace("/");
    }
  };

  return (
    <div className="relative z-10 Conteiner text-xs">
      <motion.header
        className="bg-[#000000] px-4 py-2 flex items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Columna izquierda vacÃ­a */}
        <div className="flex-1" />

        {/* Logo centrado */}
        <div className="flex items-center justify-center">
          <motion.a
            href="/"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex-shrink-0"
          >
            <Image
              src="/L_H_Blanco.svg"
              alt="Logo de la empresa"
              width={160}
              height={160}
            />
          </motion.a>
        </div>

        {/* Columna derecha â€” botÃ³n de Sesión */}
        <div className="flex-1 flex justify-end items-center">
          {status === "loading" ? (
            <button
              className="px-3 py-1.5 text-sm text-white border border-[#D06D33] rounded-full opacity-50 cursor-not-allowed"
              disabled
            >
              Cargando...
            </button>
          ) : session && session.user ? (
            <div className="relative">
              <motion.button
                onClick={toggleMenu}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-white"
              >
                <img
                  className="w-8 h-8 rounded-full ring-2 ring-[#D06D33]"
                  src={session.user?.imageUrl}
                  alt="Profile Preview"
                />
              </motion.button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    className="absolute top-full right-0 mt-1 w-36 bg-[#1C1C1C] py-2 rounded-xl shadow-xl border border-[#D06D33]/30"
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                  >
                    <ul>
                      <li>
                        <Link
                          href="/Perfil"
                          passHref
                          scroll={false}
                          className="block px-3 py-2 text-white hover:bg-[#D06D33]/20 rounded-md transition-colors"
                        >
                          Tu Perfil
                        </Link>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="block w-full px-3 py-2 text-left text-white hover:bg-[#D06D33]/20 rounded-md cursor-pointer transition-colors"
                          onClick={handleSignOut}
                          disabled={isSigningOut}
                        >
                          {isSigningOut ? "Cerrando..." : "Cerrar Sesión"}
                        </button>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.a
              href="/Login"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 350 }}
            >
              <motion.button
                className="px-4 py-1.5 text-white bg-[#D06D33] border border-[#D06D33] rounded-full inline-flex items-center gap-2"
                style={{ fontFamily: 'Quando', fontWeight: 400, fontSize: '0.875rem', letterSpacing: '0.02em' }}
                whileHover={{ backgroundColor: "#b85c2a", borderColor: "#b85c2a" }}
                transition={{ duration: 0.2 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/Extras/qr-code-svgrepo-com.svg" alt="QR" width={15} height={15} style={{ filter: 'invert(1)' }} />
                QR
              </motion.button>
            </motion.a>
          )}
        </div>
      </motion.header>
    </div>
  );
};

export default Overhead;
