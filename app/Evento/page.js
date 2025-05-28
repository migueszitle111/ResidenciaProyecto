// app/evento/page.jsx
"use client";

import Overhead     from "../components/Overhead";
import OverheadMenu from "../components/OverheadMenu";
import Footer       from "../components/Footer";
import CardsList    from "../components/CardsList";
import "./Style.css";

export default function Evento() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Cabecera fija en la parte superior */}
      <Overhead />
      <OverheadMenu />

      {/* Contenido principal que crece y centra el CardsList */}
      <main className="flex-grow mt-8 flex justify-center px-4">
        <div className="w-full max-w-4xl">
          <CardsList />
        </div>
      </main>

      {/* Footer pegado al final */}
      <Footer />
    </div>
  );
}
