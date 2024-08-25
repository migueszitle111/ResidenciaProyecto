"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import RemoveCurso from "./RemoveCurso";
import { useEffect } from "react";
import Image from "next/image";


const CursoList = () => {
   // Obtiene la sesión actual del usuario
   const { data: session } = useSession();
   // Verifica si el usuario es administrador
   const isAdmin = session && session.user && session.user.roles === 'admin';
   // Define un estado local para almacenar los temas
   const [cursos, setCursos] = useState([]);
   const [imageUrl, setImageUrl] = useState("/L_H_Blanco.png");
 
   // useEffect para realizar la carga de temas al montar el componente
   useEffect(() => {
     // Función asincrónica para obtener los temas
     const fetchCursos = async () => {
       try {
         // Realiza la solicitud a la API para obtener los temas
         const res = await fetch('http://localhost:3000/api/cursos', {
           cache: 'no-store',
         });
 
         // Verifica si la solicitud fue exitosa
         if (!res.ok) {
           throw new Error('Failed to fetch cursos');
         }
 
         // Parsea la respuesta a formato JSON
         const data = await res.json();
         // Actualiza el estado local con los temas obtenidos
         setCursos(data.cursos || []); // Asegúrate de acceder a la propiedad correcta
       } catch (error) {
         // Maneja cualquier error durante la obtención de temas
         console.error('Error loading cursos: ', error);
       }
     };
 
     // Llama a la función de carga de temas
     fetchCursos();
   }, []); // El efecto se ejecuta solo una vez al montar el componente
 
   // Renderiza la lista de temas


   return (
    <>
      {Array.isArray(cursos) && cursos.map((t, index) => (
        <div key={t._id}>
              <div className="border border-[#8f3400] rounded overflow-hidden w-[300px] h-[400px] flex flex-col items-center bg-[#8f8f8f] text-[#000000cc] m-1 py-1 hover:bg-gradient-to-br from-[#c44900cc] to-[#8f3400cc] hover:text-white">
                    <img
                        src={t.imageUrl}
                        alt="Logo de la empresa"
                        width={150}
                        height={150}
                        layout="fixed"
                    />
                    <div className="card-content">
                        <h2 className="card-title">{t.title}</h2>
                        <hr className="bg-[#8f3400]" />
                        <p className="card-description hover:text-black">{t.description}</p>
                        {isAdmin && (
                    <div className="flex gap-2 mt-7">
                        <RemoveCurso id={t._id} className="text-white" size={24} />
                        <Link href={`/Evento/EditarCursos/${t._id}`}>
                            <HiPencilAlt className="text-white" size={24} title="Modificar" />
                        </Link>
                    </div>
                  )}
                    </div>
        </div>
                  
        </div>
      ))}
    </>
  );
};

export default CursoList;