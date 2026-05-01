"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function CirugiaCard({ titulo, cirugias }) {
  const router = useRouter();

  return (
    <div className="w-full max-w-3xl mx-auto my-6 bg-orange-500 rounded-tr-3xl rounded-bl-3xl p-8 md:p-10">
      <h2 className="text-2xl font-bold text-white mb-3">{titulo}</h2>
      <hr className="bg-white h-0.5 mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {cirugias.map((cirugia) => (
          <motion.button
            key={cirugia}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              router.push(
                `/Monitoreo/Cirugia/${encodeURIComponent(cirugia)}`
              )
            }
            className="bg-black text-white text-sm text-left px-4 py-3 rounded-md hover:bg-gray-900 transition-colors w-full"
          >
            {cirugia}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
