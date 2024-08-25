"use client";
import Overhead from '../../components/Overhead.js';
import OverheadMenu from '../../components/OverheadMenu';
import SubMenu from '../../components/Submenu';
import "../Style.css";
import "../../globals.css";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Sidebar from '../Sidebar.jsx';
import { mutate } from 'swr';


export default function Perfil () {

  const { data: session, status } = useSession();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const SubmitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const userId = session?.user?._id;

      const updatedUserData = {
        userId,
        password,
        newPassword,
        confirmPassword,
        // Agrega otros campos según sea necesario
      };

      await fetch('/api/updateProfile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
      });

      mutate('/api/getUser', {}, false);
      setLoading(false);

      window.location.reload();
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      setLoading(false);
    }
  };
  
  return (
  <> 
    <div>
      <Overhead />
      <OverheadMenu />
      <hr className="bg-white h-0.5" />
      <div className='bg-[#000000CC]'>
        <SubMenu/>
        <div className="flex min-h-screen flex-col md: flex-row items-center justify-between p-24">
          <div className="BannerTitlepage">
            <div>Perfil</div>
          </div>
          <div className="Profile_Container">
   1.      <Sidebar />
            <div className="info_profile">
              <form onSubmit={SubmitHandler}>
              {status === 'loading' && <p>Cargando...</p>}
              {status === 'authenticated' && session && (
                <figure className="flex items-start sm:items-center">
                  <figcaption>
                  <h5 className="font-semibold text-lg">Cambiar Contraseña</h5>
                    <hr className="mb-4"/>
                    <p>
                    <div className="mb-4">
                      <label className="block mb-1"> Anterior contraseña:  </label>
                          <input
                            className="appearance-none border border-gray-200 bg-gray-100 text-black rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                            type="password"
                            placeholder="Ingrese su contraseña actual"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                     </div>
                     <div className="mb-4">
                      <label className="block mb-1"> Nueva contraseña </label>
                          <input
                            className="appearance-none border border-gray-200 bg-gray-100 text-black rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                            type="password"
                            placeholder="Ingrese su nueva contraseña"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                     </div>
                      <div className="mb-4">
                        <label className="block mb-1"> Confirmar contraseña: </label>
                        <input
                          className="appearance-none border border-gray-200 bg-gray-100 text-black rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                          type="password"
                          placeholder="Confirme su contraseña"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </p>
                  </figcaption>
                </figure>
              )}
              {status === 'unauthenticated' && <p>No autenticado</p>}
                <button
                    type="submit"
                    className="bg-black text-white mt-6 px-6 py-3 rounded-md hover:bg-gray-900"
                    disabled={loading ? true : false}
                  >
                    {loading ? "Actualizando..." : "Actualizar"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>   
  );
}
