"use client";
import Overhead from "../../../components/Overhead";
import OverheadMenu from "../../../components/OverheadMenu";
import SubMenu from "../../../components/Submenu";
import Footer from "../../../components/Footer";
import CirugiaCard from "../../components/CirugiaCard";

const cirugias = [
  "ALIF - Fusión Lumbar Intersomática Anterior",
  "Descompresión Lumbar Mínimamente Invasiva",
  "Instrumentación Lumbar",
  "Instrumentación Percutánea Lumbar",
  "Laminectomía + Foraminotomía Lumbar",
  "LLIF - Fusión Lumbar Intersomática Lateral",
  "PLIF - Fusión Lumbar Intersomática Posterior",
  "Liberación Microquirúrgica de Medula Anclada",
];

export default function MonitoreoLumbar() {
  return (
    <div className="Conteiner bg-black min-h-screen">
      <Overhead />
      <OverheadMenu />
      <hr className="bg-grey h-0.5" />
      <SubMenu />
      <hr className="bg-grey h-0.5" />
      <div className="px-4 py-6">
        <CirugiaCard titulo="Lumbar" cirugias={cirugias} />
      </div>
      <hr className="bg-white h-0.5" />
      <Footer />
    </div>
  );
}
