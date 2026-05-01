// app/Perfil/page.js
"use client";
import Overhead from "../components/Overhead";
import OverheadMenu from "../components/OverheadMenu";
import SubMenu from "../components/Submenu";
import "./Style.css";
import "../globals.css";
import Footer from "../components/Footer";
import { useSession } from "next-auth/react";
import React from "react";
import Sidebar from "./Sidebar.jsx";

export default function Perfil() {
  const { data: session, status } = useSession();

  return (
    <div className="Conteiner">
      <Overhead />
      <OverheadMenu />
      <hr className="bg-white h-0.5" />
      <div className="bg-[#000000CC]">
        <SubMenu />
        <div className="flex min-h-screen flex-col md: flex-row items-center justify-between p-24">
          <div className="BannerTitlepage">
            <div>Perfil</div>
          </div>
          <div className="Profile_Container">
            <Sidebar />
            <div className="info_profile">
              {status === "loading" && <p>Cargando...</p>}
              {status === "authenticated" && session && (
                <figure className="flex items-start sm:items-center">
                  <figcaption>
                    <h5 className="font-semibold text-lg">Datos del Perfil</h5>
                    <hr />
                    <img
                      src={session.user?.imageUrl}
                      alt={session.user?.name}
                      width={70}
                      height={70}
                      className="w-14 h-14 rounded-full"
                    />
                    <p>
                      <b>Nombre:</b>{" "}
                      <p className="mr-2">{session.user?.name}</p>
                      <b>Apellidos:</b>{" "}
                      <p className="mr-2">{session.user?.lastname}</p>
                      <b>Email:</b>{" "}
                      <p className="mr-2">{session.user?.email}</p>
                      <b>Especialidad:</b>{" "}
                      <p className="mr-2">{session.user?.specialty}</p>
                      <b>Cédula profesional:</b>{" "}
                      <p className="mr-2">{session.user?.idprofessional}</p>
                    </p>
                  </figcaption>
                </figure>
              )}
              {status === "unauthenticated" && <p>No autenticado</p>}
            </div>
          </div>
        </div>
      </div>
      <hr className="bg-white h-0.5" />
      <Footer />
    </div>
  );
}
