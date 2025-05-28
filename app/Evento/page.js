// app/evento/page.jsx   (o donde lo tengas ubicado)
"use client";

import Overhead     from "../components/Overhead";
import OverheadMenu from "../components/OverheadMenu";
import "./Style.css";
import Footer       from "../components/Footer";
import CardsList    from "../components/CardsList";

export default function Evento() {
  return (
    <div className="Conteiner w-full">
      <Overhead />
      <OverheadMenu />

      {/* margen superior para separar un poco del menú */}
      <div className="Conteiner mt-8">
        <CardsList />
      </div>

      <Footer />
    </div>
  );
}
