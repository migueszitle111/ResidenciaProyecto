'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const DEFAULT_QR_POLL_MS = 2500;

function formatCountdown(secondsLeft) {
  const total = Math.max(0, secondsLeft);
  const minutes = String(Math.floor(total / 60)).padStart(2, '0');
  const seconds = String(total % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function getQrStatusLabel(status) {
  switch (status) {
    case 'loading':   return 'Generando QR...';
    case 'pending':   return 'Esperando escaneo';
    case 'signing-in':return 'Abriendo sesion...';
    case 'expired':   return 'QR expirado';
    case 'consumed':  return 'QR usado';
    case 'error':     return 'Error al generar QR';
    default:          return 'Listo';
  }
}

const isDev = process.env.NODE_ENV === 'development';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [qrSession, setQrSession] = useState(null);
  const [qrStatus, setQrStatus] = useState('idle');
  const [qrError, setQrError] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isQrVisible, setIsQrVisible] = useState(false);
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
      router.refresh();
    }
  }, [router, status]);

  useEffect(() => {
    if (!qrSession?.expiresAt) {
      setSecondsLeft(0);
      return undefined;
    }
    const updateCountdown = () => {
      const diffMs = new Date(qrSession.expiresAt).getTime() - Date.now();
      const nextSeconds = Math.max(0, Math.ceil(diffMs / 1000));
      setSecondsLeft(nextSeconds);
      if (nextSeconds === 0 && qrStatus === 'pending') setQrStatus('expired');
    };
    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);
    return () => clearInterval(intervalId);
  }, [qrSession, qrStatus]);

  const startQrLogin = async () => {
    setQrError('');
    setQrStatus('loading');
    setQrSession(null);
    try {
      const response = await fetch('/api/auth/qr/init', { method: 'POST', cache: 'no-store' });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.message || 'No se pudo generar el QR');
      setQrSession(payload);
      setQrStatus('pending');
    } catch (qrInitError) {
      console.error('Error iniciando QR login:', qrInitError);
      setQrStatus('error');
      setQrError('No se pudo generar el QR.');
    }
  };

  useEffect(() => {
    if (!qrSession || qrStatus !== 'pending') return undefined;
    let active = true;
    let timeoutId;
    const pollStatus = async () => {
      try {
        const params = new URLSearchParams({ challengeId: qrSession.challengeId, browserCode: qrSession.browserCode });
        const response = await fetch(`/api/auth/qr/status?${params.toString()}`, { cache: 'no-store' });
        const payload = await response.json();
        if (!active) return;
        if (!response.ok && response.status !== 410) { setQrStatus('error'); setQrError('El QR ya no es valido. Genera otro.'); return; }
        setQrError('');
        if (response.status === 410 || payload?.status === 'expired') { setQrStatus('expired'); return; }
        if (payload?.status === 'approved') {
          setQrStatus('signing-in');
          const signInResult = await signIn('qr-web', { challengeId: qrSession.challengeId, browserCode: qrSession.browserCode, redirect: false, callbackUrl: '/' });
          if (!active) return;
          if (signInResult?.error) { setQrStatus('error'); setQrError('No se pudo abrir la sesion.'); return; }
          router.replace('/');
          router.refresh();
          return;
        }
        if (payload?.status === 'consumed') { setQrStatus('consumed'); return; }
        timeoutId = setTimeout(pollStatus, qrSession.pollAfterMs || DEFAULT_QR_POLL_MS);
      } catch (pollError) {
        console.error('Error consultando QR login:', pollError);
        if (!active) return;
        setQrError('Error de conexion.');
        timeoutId = setTimeout(pollStatus, (qrSession.pollAfterMs || DEFAULT_QR_POLL_MS) * 2);
      }
    };
    pollStatus();
    return () => { active = false; clearTimeout(timeoutId); };
  }, [qrSession, qrStatus, router]);

  const handleDevLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    const result = await signIn('credentials', { email, password, redirect: false, callbackUrl: '/' });
    if (result?.error) {
      setLoginError('Credenciales invalidas');
    } else {
      router.replace('/');
      router.refresh();
    }
  };

  const handleQrToggle = async () => {
    if (isQrVisible) { setIsQrVisible(false); return; }
    setIsQrVisible(true);
    const mustCreateNewQr = !qrSession || qrStatus === 'expired' || qrStatus === 'error' || qrStatus === 'consumed' || secondsLeft <= 0;
    if (mustCreateNewQr) await startQrLogin();
  };

  if (status === 'authenticated') return null;

  const qrImageUrl = qrSession?.qrValue
    ? `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(qrSession.qrValue)}`
    : '';

  const isActive = qrStatus === 'pending' || qrStatus === 'loading';

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Contenido centrado */}
      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-sm">

          {/* Logo con función regresar */}
          <div className="flex justify-center mb-8">
            <button onClick={() => router.back()} className="opacity-70 hover:opacity-100 transition-opacity">
              <Image src="/L_B_Blanco.svg" width={64} height={64} alt="Logo" />
            </button>
          </div>

          {/* Título */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold tracking-tight" style={{ fontFamily: 'Quando' }}>
              Iniciar Sesion
            </h1>
            <p className="mt-2 text-sm text-slate-500" style={{ fontFamily: 'LuxoraGrotesk' }}>
              Escanea el codigo QR con tu app movil
            </p>
          </div>

          {/* Formulario solo en desarrollo */}
          {isDev && (
            <form onSubmit={handleDevLogin} className="mb-5 flex flex-col gap-3">
              <input
                type="email"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-2xl border border-slate-700 bg-white px-4 py-3 text-black text-sm placeholder-slate-400 focus:border-orange-400 focus:outline-none"
              />
              <input
                type="password"
                placeholder="Contrasena"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-2xl border border-slate-700 bg-white px-4 py-3 text-black text-sm placeholder-slate-400 focus:border-orange-400 focus:outline-none"
              />
              {loginError && (
                <p className="text-xs text-red-400 text-center">{loginError}</p>
              )}
              <button
                type="submit"
                className="w-full rounded-2xl bg-orange-500 py-3 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
                style={{ fontFamily: 'Quando' }}
              >
                Entrar (Dev)
              </button>
            </form>
          )}

          {/* Tarjeta principal */}
          <div className="rounded-3xl border border-white/8 bg-white/4 backdrop-blur-sm overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>

            {/* Header de la tarjeta */}
            <div className="px-6 pt-6 pb-4 border-b border-white/8" style={{ borderBottomColor: 'rgba(255,255,255,0.08)' }}>
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/Extras/qr-code-svgrepo-com.svg"
                  alt="QR"
                  width={22}
                  height={22}
                  style={{ filter: 'invert(1)', opacity: 0.7 }}
                />
                <span className="text-sm text-slate-400" style={{ fontFamily: 'LuxoraGrotesk' }}>
                  Acceso por codigo QR
                </span>
                {isActive && (
                  <span className="ml-auto flex items-center gap-1.5 text-xs text-orange-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                    Activo
                  </span>
                )}
              </div>
            </div>

            {/* Área del QR */}
            <div className="p-6">
              {!isQrVisible ? (
                /* Estado inicial — invita a generar */
                <div className="flex flex-col items-center gap-6 py-4">
                  <div className="w-24 h-24 rounded-2xl bg-white/6 flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.06)' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/assets/Extras/qr-code-svgrepo-com.svg"
                      alt="QR"
                      width={48}
                      height={48}
                      style={{ filter: 'invert(1)', opacity: 0.3 }}
                    />
                  </div>
                  <p className="text-xs text-slate-600 text-center" style={{ fontFamily: 'LuxoraGrotesk' }}>
                    Genera un codigo QR para iniciar sesion desde la app
                  </p>
                </div>
              ) : (
                /* Estado con QR generado */
                <div className="flex flex-col items-center gap-4">
                  {/* Imagen QR */}
                  <div className="relative rounded-2xl overflow-hidden bg-white p-3 shadow-lg shadow-black/40"
                    style={{ width: 200, height: 200 }}>
                    {qrStatus === 'loading' ? (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                        <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-orange-500 animate-spin" />
                        <p className="text-xs text-slate-400">Generando...</p>
                      </div>
                    ) : qrImageUrl ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={qrImageUrl}
                          alt="QR para iniciar sesion"
                          className="w-full h-full object-contain rounded-xl"
                          style={{ opacity: qrStatus === 'expired' ? 0.3 : 1, transition: 'opacity 0.3s' }}
                        />
                        {qrStatus === 'expired' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-semibold text-slate-600 bg-white/90 px-2 py-1 rounded-lg">
                              Expirado
                            </span>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <p className="text-xs text-slate-400">Sin QR</p>
                      </div>
                    )}
                  </div>

                  {/* Estado y countdown */}
                  <div className="text-center">
                    <p className="text-sm font-medium text-white" style={{ fontFamily: 'LuxoraGrotesk' }}>
                      {getQrStatusLabel(qrStatus)}
                    </p>
                    {(qrStatus === 'pending' || qrStatus === 'expired') && (
                      <p className="mt-0.5 text-xs text-slate-500">
                        Caduca en{' '}
                        <span className={secondsLeft < 30 ? 'text-red-400' : 'text-slate-400'}>
                          {formatCountdown(secondsLeft)}
                        </span>
                      </p>
                    )}
                  </div>

                  {/* Error */}
                  {qrError && (
                    <p className="w-full rounded-xl border border-red-500/20 bg-red-500/8 px-3 py-2 text-xs text-center text-red-400"
                      style={{ background: 'rgba(239,68,68,0.08)' }}>
                      {qrError}
                    </p>
                  )}
                </div>
              )}

              {/* Botón principal */}
              <button
                type="button"
                onClick={handleQrToggle}
                className="mt-5 w-full rounded-2xl py-3 text-sm font-semibold transition-all duration-200"
                style={{
                  fontFamily: 'Quando',
                  background: isQrVisible ? 'rgba(255,255,255,0.06)' : '#B54B00',
                  color: isQrVisible ? '#94a3b8' : '#fff',
                  border: isQrVisible ? '1px solid rgba(255,255,255,0.1)' : 'none',
                }}
              >
                {isQrVisible ? 'Ocultar QR' : 'Generar codigo QR'}
              </button>

              {/* Botón regenerar */}
              {isQrVisible && (
                <button
                  type="button"
                  onClick={startQrLogin}
                  className="mt-2 w-full rounded-2xl py-2.5 text-xs transition-colors"
                  style={{ fontFamily: 'LuxoraGrotesk', color: '#64748b' }}
                >
                  Generar nuevo QR
                </button>
              )}
            </div>
          </div>

          {/* Instrucciones */}
          <div className="mt-6 flex flex-col gap-3">
            {[
              { n: '1', text: 'Abre la app MEDXpro en tu celular' },
              { n: '2', text: 'Ve a Ajustes → Iniciar sesion en web' },
              { n: '3', text: 'Escanea el codigo QR' },
            ].map(({ n, text }) => (
              <div key={n} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-white/8 flex items-center justify-center text-xs text-slate-500 flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.08)', fontFamily: 'LuxoraGrotesk' }}>
                  {n}
                </span>
                <p className="text-xs text-slate-500" style={{ fontFamily: 'LuxoraGrotesk' }}>{text}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
