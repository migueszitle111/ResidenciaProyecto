// Importa la dependencia de cliente para NextAuth
"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Overhead from "../../components/Overhead";
import OverheadMenu from "../../components/OverheadMenu";
import SubMenu from "../../components/Submenu";
import Sidebar from "../Sidebar";
import { mutate } from "swr";
import { Cloudinary } from "cloudinary-core";

const Perfil_Actualizar = () => {
  const { data: session, status } = useSession();
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [name, setName] = useState(session?.user?.name || "");
  const [lastname, setLastname] = useState(session?.user?.lastname || "");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [cedula, setCedula] = useState(session?.user?.cedula || "");
  const [especialidad, setEspecialidad] = useState(session?.user?.especialidad || "");
  const [loading, setLoading] = useState(false);
  const [newAvatar, setNewAvatar] = useState(null);

  const cloudinary = new Cloudinary({
    cloud_name: "dgpzqbgz6", 
    api_key: "435159313488559",
  });

  const onChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewAvatar(file);
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userId = session?.user?._id;
      const updatedUserData = {
        userId,
        name,
        lastname,
        email,
        cedula,
        especialidad,
        imageUrl: null, // Inicializamos imageUrl como null
      };

      if (newAvatar) {
        // Subir la nueva imagen a Cloudinary
        const formData = new FormData();
        formData.append("file", newAvatar);
        formData.append("upload_preset", "o4nui5gs"); // Reemplaza con tu upload_preset de Cloudinary

        const cloudinaryResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudinary.config().cloud_name}/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const cloudinaryData = await cloudinaryResponse.json();
        updatedUserData.imageUrl = cloudinaryData.secure_url;
      }

      await fetch("/api/updateProfile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      });

      mutate("/api/getUser");
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <div>
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
                <form onSubmit={handleUpdateProfile}>
                  {status === "loading" && <p>Cargando...</p>}
                  {status === "authenticated" && session && (
                    <figure className="flex items-start sm:items-center">
                      <figcaption>
                        <h5 className="font-semibold text-lg">
                          Modificar Perfil
                        </h5>
                        <hr />
                        <div className="mb-4">
                          <label className="block mb-1"> Foto de perfil </label>
                          <div className="mb-4 flex flex-col md:flex-row">
                            <div className="flex items-center mb-4 space-x-3 mt-4 cursor-pointer md:w-1/5 lg:w-1/4">
                              {avatarPreview ? (
                                <img
                                  className="w-14 h-14 rounded-full"
                                  src={avatarPreview}
                                />
                              ) : (
                                <div className="bg-gray-700 w-14 h-14 rounded-full"></div>
                              )}
                            </div>
                            <div className="md:w-2/3 lg:w-80">
                              <input
                                className="form-control block w-full px-2 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-6"
                                type="file"
                                id="formFile"
                                onChange={onChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mb-4">
                          <label className="block mb-1"> Nombre: </label>
                          <input
                            className="appearance-none border border-gray-200 bg-gray-100 text-black rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                            type="text"
                            placeholder={session.user?.name}
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block mb-1"> Apellidos: </label>
                          <input
                            className="appearance-none border border-gray-200 bg-gray-100 text-black rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                            type="text"
                            placeholder={session.user?.lastname}
                            required
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block mb-1"> Email: </label>
                          <input
                            className="appearance-none border border-gray-200 bg-gray-100 text-black rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                            type="email"
                            placeholder={session.user?.email}
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block mb-1"> Especialidad: </label>
                          <input
                            className="appearance-none border border-gray-200 bg-gray-100 text-black rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                            type="text"
                            placeholder={session.user?.especialidad}
                            required
                            value={especialidad}
                            onChange={(e) => setEspecialidad(e.target.value)}
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block mb-1"> Cedula: </label>
                          <input
                            className="appearance-none border border-gray-200 bg-gray-100 text-black rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                            type="text"
                            placeholder={session.user?.cedula}
                            required
                            value={cedula}
                            onChange={(e) => setCedula(e.target.value)}
                          />
                        </div>
                      </figcaption>
                    </figure>
                  )}
                  {status === "unauthenticated" && <p>No autenticado</p>}
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
};

export default Perfil_Actualizar;
