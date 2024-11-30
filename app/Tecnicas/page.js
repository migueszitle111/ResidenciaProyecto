"use client";
import Footer from "../components/Footer";
import Overhead from "../components/Overhead";
import OverheadMenu from "../components/OverheadMenu";
import SubMenu from "../components/Submenu";
import SubMenuE from "./SubMenuE";

export default function Reporte() {
  return (
    <div div className="Conteiner">
      <Overhead />
      <OverheadMenu />
      <hr className="bg-white h-0.5" />
      <div className="bg-[#000000CC]">
        <SubMenu />
        <div className="items-center px-5 lg:px-10">
          <div className="BannerTitlepage">
            <div>Técnicas</div>
          </div>
          <SubMenuE />
        </div>
      </div>
      <hr className="bg-white h-0.5" />
      <Footer />
    </div>
  );
}
