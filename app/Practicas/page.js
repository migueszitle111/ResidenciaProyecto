"use client";
import React from "react";
import Overhead from "../components/Overhead";
import OverheadMenu from "../components/OverheadMenu";
import SubMenu from "../components/Submenu";
import VideoCard from "./VideoCard";
import Footer from "../components/Footer";

export default function Practicas() {
  return (
    <div>
      <Overhead />
      <OverheadMenu />
      <hr className="bg-white h-0.5" />
      <SubMenu />
      <div className="Conteiner ">
        {/*Titulo */}
        <div className=" items-center px-5 xl:px-24 lg:px-5 py-5">
          <div className="BannerTitlepage">
            <div>Practicas</div>
          </div>
        </div>
        {/*Descripcion */}
        <div className=" Conteiner p-2">
          <h1 className="text-white text-3xl">Videos</h1>
          <p className="text-white text-justify text-xl italic p-2">
            Practicas presentadas en videos
          </p>
        </div>
        <div className="flex flex-col items-center p-2 pb-16">
          <VideoCard />
        </div>
      </div>
      <hr className="bg-white h-0.5" />
      <Footer />
    </div>
  );
}
