"use client";
import Overhead from "../../../components/Overhead";
import OverheadMenu from "../../../components/OverheadMenu";
import SubMenu from "../../../components/Submenu";
import Footer from "../../../components/Footer";
import CirugiaCard from "../../components/CirugiaCard";

const cirugias = [
  "Resección de Meningioma Craneal",
  "Resección de Meningioma Fosa Posterior Tentorial",
  "Resección de Schwanoma Vestibular (Neurinoma del Acústico)",
  "Resección Endonasal de Adenoma Hipofisiario",
  "Resección Endonasal de Craneofaringioma",
  "Resección Frontal de Glioblastoma",
  "Resección Glioma Óptico Quiasmático",
  "Resección Microquirúrgica de Astrocitoma Cerebeloso",
];

export default function MonitoreoCraneal() {
  return (
    <div className="Conteiner bg-black min-h-screen">
      <Overhead />
      <OverheadMenu />
      <hr className="bg-grey h-0.5" />
      <SubMenu />
      <hr className="bg-grey h-0.5" />
      <div className="px-4 py-6">
        <CirugiaCard titulo="Craneal" cirugias={cirugias} />
      </div>
      <hr className="bg-white h-0.5" />
      <Footer />
    </div>
  );
}
