// app/login/page.js
'use client';

import React, { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Overhead from '../components/Overhead';
import OverheadMenu from '../components/OverheadMenu';
import './Style.css';

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const router                  = useRouter();

  useEffect(() => {
    if (error) {
      const t = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(t);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn('credentials', { email, password, redirect: false });
    if (res.error) return setError('Credenciales inválidas');
    router.replace('/');
  };

  return (
    <div className="Conteiner">
      <Overhead />
      <OverheadMenu />
      <hr className="bg-white h-0.5" />

      {/* — Tarjeta centrada y un poco más abajo — */}
      <main className="flex justify-center mt-12 px-4">
        <div className="mx-auto w-full max-w-3xl rounded-xl bg-black p-14 shadow-lg backdrop-blur">
          <h1 className="mb-8 text-center text-3xl font-semibold text-white">
            Iniciar Sesión
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full rounded-md border border-slate-600 bg-white p-3 text-black placeholder-slate-500 focus:border-orange-400 focus:outline-none"
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full rounded-md border border-slate-600 bg-white p-3 text-black placeholder-slate-500 focus:border-orange-400 focus:outline-none"
            />

            {error && (
              <p className="text-center text-sm text-red-400">{error}</p>
            )}

            <button
              type="submit"
              className="block w-full rounded-md bg-orange-500 py-3 font-medium text-white hover:bg-orange-600 focus:outline-none"
            >
              Entrar
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-300">
            ¿No tienes cuenta?{' '}
            <a
              href="/Registro"
              className="font-medium text-orange-400 hover:underline"
            >
              Regístrate
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
