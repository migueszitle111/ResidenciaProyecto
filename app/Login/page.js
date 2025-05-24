//app/login/page.js

"use client";

import React, { useState, useEffect } from "react";
import { signIn }    from "next-auth/react";
import { useRouter } from "next/navigation";
import Overhead      from "../components/Overhead";
import OverheadMenu  from "../components/OverheadMenu";
import "./Style.css";

export default function Login() {
  const [email, setEmail]     = useState("");
  const [password, setPassword]= useState("");
  const [error, setError]     = useState("");
  const router = useRouter();

  useEffect(()=>{
    if(error){
      const t=setTimeout(()=>setError(""),3000);
      return()=>clearTimeout(t);
    }
  },[error]);

  const handleSubmit=async e=>{
    e.preventDefault();
    const res = await signIn("credentials",{ email, password, redirect:false });
    if(res.error) return setError("Credenciales inválidas");
    router.replace("/");
  };

  return (
    <div className="Conteiner">
      <Overhead /><OverheadMenu /><hr className="bg-white h-0.5"/>
      <div className="p-6">
        <h1 className="text-4xl text-white">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <input type="email" placeholder="Correo" onChange={e=>setEmail(e.target.value)} required className="w-full p-2 rounded"/>
          <input type="password" placeholder="Contraseña" onChange={e=>setPassword(e.target.value)} required className="w-full p-2 rounded"/>
          {error && <p className="text-red-500">{error}</p>}
          <button className="w-full bg-orange-500 text-white py-2 rounded">Entrar</button>
        </form>

        <p className="mt-4 text-white">
          ¿No tienes cuenta? <a href="/Registro" className="text-orange-300">Regístrate</a>
        </p>
             
      </div>
    </div>
  );
}
