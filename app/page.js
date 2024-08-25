"use client";
import React from "react";
import Navbar from "./components/Navbar";
import CardsList from "./components/CardsList";
import SubMenu from "./components/Submenu";
import BannerPublicitarios from "./components/BannerPublicitario";
import { useSession } from "next-auth/react";
import HeadComponents from "./components/HeadComponents";
import FooterComponents from "./components/FooterComponents";

const Home = () => {
  const { data: session } = useSession();
  const isAdmin = session && session.user && session.user.roles === "admin";

  return (
    <>
      <HeadComponents />
      <div className="Conteiner">
        <SubMenu />
        {/*Si el usuario es admin, se muestra el navbar*/}
        {isAdmin && (
          <div className="max-w-3xl mx-auto p-4">
            <Navbar />
          </div>
        )}
        <CardsList />
        <BannerPublicitarios />
        <FooterComponents />
      </div>
    </>
  );
};

export default Home;
