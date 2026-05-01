"use client";
import React from "react";
import Overhead from "../components/Overhead";
import OverheadMenu from "../components/OverheadMenu";
import SubMenu from "../components/Submenu";
import Footer from "../components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const tipos = [
  { label: "Craneal",  href: "/Monitoreo/Tipos/Craneal" },
  { label: "Cervical", href: "/Monitoreo/Tipos/Cervical" },
  { label: "Lumbar",   href: "/Monitoreo/Tipos/Lumbar" },
  { label: "Otros",    href: "/Monitoreo/Tipos/Otros" },
];

export default function Monitoreo() {
  const router = useRouter();

  return (
    <div className="Conteiner bg-black min-h-screen">
      <Overhead />
      <OverheadMenu />
      <hr className="bg-grey h-0.5" />
      <SubMenu />
      <hr className="bg-grey h-0.5" />

      <div className="flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-3xl bg-orange-500 rounded-tr-3xl rounded-bl-3xl p-8 md:p-12">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-white mb-4">
                Tipos de Monitoreo
              </h2>
              <hr className="bg-white h-0.5 mb-6" />
              <div className="grid grid-cols-2 gap-4">
                {tipos.map(({ label, href }) => (
                  <motion.button
                    key={label}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => router.push(href)}
                    className="bg-black text-white text-center py-3 rounded-md hover:bg-gray-900 w-full text-sm transition-colors"
                  >
                    {label}
                  </motion.button>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center mt-6 md:mt-0">
              <Image
                src="/L_B_Blanco.svg"
                alt="Monitoreo"
                width={200}
                height={200}
                className="grayscale opacity-80"
              />
            </div>
          </div>
        </div>
      </div>

      <hr className="bg-white h-0.5" />
      <Footer />
    </div>
  );
}
