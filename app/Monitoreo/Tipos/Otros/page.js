"use client";
import Overhead from "../../../components/Overhead";
import OverheadMenu from "../../../components/OverheadMenu";
import SubMenu from "../../../components/Submenu";
import Footer from "../../../components/Footer";
import CirugiaCard from "../../components/CirugiaCard";

const cirugias = [
  "Exploración Neurólisis y Reparación Microquirúrgica de Plexo Lumbar",
  "Instrumentación Posterior Toracolumbar con Corrección",
  "Neurorrafia Microquirúrgica de Plexo Braquial",
  "Resección Microquirúrgia de Tumoración Intramedular",
  "Endarterectomía Carotídea",
  "Neurólisis de Nervio Periférico",
  "Neurorrafia Microquirúrgica de Nervio Periférico",
  "Tiroidectomía",
];

export default function MonitoreoOtros() {
  return (
    <div className="Conteiner bg-black min-h-screen">
      <Overhead />
      <OverheadMenu />
      <hr className="bg-grey h-0.5" />
      <SubMenu />
      <hr className="bg-grey h-0.5" />
      <div className="px-4 py-6">
        <CirugiaCard titulo="Otros" cirugias={cirugias} />
      </div>
      <hr className="bg-white h-0.5" />
      <Footer />
    </div>
  );
}
