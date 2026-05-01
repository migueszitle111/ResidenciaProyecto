"use client";
import Overhead from "../../../components/Overhead";
import OverheadMenu from "../../../components/OverheadMenu";
import SubMenu from "../../../components/Submenu";
import Footer from "../../../components/Footer";
import CirugiaCard from "../../components/CirugiaCard";

const cirugias = [
  "Artroplastía Cervical",
  "Disectomía Cervical Anterior 2-3 Niveles",
  "Disectomía Cervical Anterior",
  "Instrumentación Cervical Posterior",
  "Laminectomía + Foraminotomía Cervical",
  "Corpectomía Cervical Anterior",
  "Endoscopía Cervical Posterior",
  "Descompresión de la Unión Cráneo Cervical",
];

export default function MonitoreoCervical() {
  return (
    <div className="Conteiner bg-black min-h-screen">
      <Overhead />
      <OverheadMenu />
      <hr className="bg-grey h-0.5" />
      <SubMenu />
      <hr className="bg-grey h-0.5" />
      <div className="px-4 py-6">
        <CirugiaCard titulo="Cervical" cirugias={cirugias} />
      </div>
      <hr className="bg-white h-0.5" />
      <Footer />
    </div>
  );
}
