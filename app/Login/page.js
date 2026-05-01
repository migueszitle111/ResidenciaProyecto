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
    case 'loading':
      return 'Generando QR...';
    case 'pending':
      return 'Esperando escaneo';
    case 'signing-in':
      return 'Abriendo sesion...';
    case 'expired':
      return 'QR expirado';
    case 'consumed':
      return 'QR usado';
    case 'error':
      return 'Error al generar QR';
    default:
      return 'Listo';
  }
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [qrSession, setQrSession] = useState(null);
  const [qrStatus, setQrStatus] = useState('idle');
  const [qrError, setQrError] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isQrVisible, setIsQrVisible] = useState(false);
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!error) {
      return undefined;
    }

    const timer = setTimeout(() => setError(''), 3000);
    return () => clearTimeout(timer);
  }, [error]);

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

      if (nextSeconds === 0 && qrStatus === 'pending') {
        setQrStatus('expired');
      }
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
      const response = await fetch('/api/auth/qr/init', {
        method: 'POST',
        cache: 'no-store',
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.message || 'No se pudo generar el QR');
      }

      setQrSession(payload);
      setQrStatus('pending');
    } catch (qrInitError) {
      console.error('Error iniciando QR login:', qrInitError);
      setQrStatus('error');
      setQrError('No se pudo generar el QR.');
    }
  };

  useEffect(() => {
    if (!qrSession || qrStatus !== 'pending') {
      return undefined;
    }

    let active = true;
    let timeoutId;

    const pollStatus = async () => {
      try {
        const params = new URLSearchParams({
          challengeId: qrSession.challengeId,
          browserCode: qrSession.browserCode,
        });

        const response = await fetch(`/api/auth/qr/status?${params.toString()}`, {
          cache: 'no-store',
        });

        const payload = await response.json();

        if (!active) {
          return;
        }

        if (!response.ok && response.status !== 410) {
          setQrStatus('error');
          setQrError('El QR ya no es valido. Genera otro.');
          return;
        }

        setQrError('');

        if (response.status === 410 || payload?.status === 'expired') {
          setQrStatus('expired');
          return;
        }

        if (payload?.status === 'approved') {
          setQrStatus('signing-in');

          const signInResult = await signIn('qr-web', {
            challengeId: qrSession.challengeId,
            browserCode: qrSession.browserCode,
            redirect: false,
            callbackUrl: '/',
          });

          if (!active) {
            return;
          }

          if (signInResult?.error) {
            setQrStatus('error');
            setQrError('No se pudo abrir la sesion.');
            return;
          }

          router.replace('/');
          router.refresh();
          return;
        }

        if (payload?.status === 'consumed') {
          setQrStatus('consumed');
          return;
        }

        timeoutId = setTimeout(
          pollStatus,
          qrSession.pollAfterMs || DEFAULT_QR_POLL_MS
        );
      } catch (pollError) {
        console.error('Error consultando QR login:', pollError);

        if (!active) {
          return;
        }

        setQrError('Error de conexion.');
        timeoutId = setTimeout(
          pollStatus,
          (qrSession.pollAfterMs || DEFAULT_QR_POLL_MS) * 2
        );
      }
    };

    pollStatus();

    return () => {
      active = false;
      clearTimeout(timeoutId);
    };
  }, [qrSession, qrStatus, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: '/',
    });

    if (response?.error) {
      setError('Credenciales invalidas');
      return;
    }

    router.replace('/');
    router.refresh();
  };

  const handleQrToggle = async () => {
    if (isQrVisible) {
      setIsQrVisible(false);
      return;
    }

    setIsQrVisible(true);

    const mustCreateNewQr =
      !qrSession ||
      qrStatus === 'expired' ||
      qrStatus === 'error' ||
      qrStatus === 'consumed' ||
      secondsLeft <= 0;

    if (mustCreateNewQr) {
      await startQrLogin();
    }
  };

  if (status === 'authenticated') {
    return null;
  }

  const qrImageUrl = qrSession?.qrValue
    ? `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(qrSession.qrValue)}`
    : '';

  return (
    <div className="min-h-screen bg-black px-4 py-8 text-white">
      <button
        onClick={() => router.back()}
        className="mb-10 flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={18}
          height={18}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Regresar
      </button>

      <div className="mx-auto max-w-md">
        <div className="mb-8 flex items-center justify-center">
          <Image src="/L_B_Blanco.svg" width={72} height={72} alt="Logo" />
        </div>

        <div className="rounded-[2rem] border border-slate-800 bg-[#111] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.65)]">
          <h1 className="text-center text-4xl font-semibold text-white">
            Iniciar Sesion
          </h1>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Correo electronico
              </label>
              <input
                type="email"
                placeholder="tucorreo@ejemplo.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="block w-full rounded-2xl border border-slate-700 bg-white px-4 py-3 text-black placeholder-slate-500 focus:border-orange-400 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Contrasena
              </label>
              <input
                type="password"
                placeholder="Ingresa tu contrasena"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="block w-full rounded-2xl border border-slate-700 bg-white px-4 py-3 text-black placeholder-slate-500 focus:border-orange-400 focus:outline-none"
              />
            </div>

            {error ? (
              <p className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              className="block w-full rounded-2xl bg-orange-500 py-3.5 text-base font-semibold text-white transition-colors hover:bg-orange-600 focus:outline-none"
            >
              Entrar
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-800" />
            <span className="text-xs uppercase tracking-[0.3em] text-slate-500">
              o
            </span>
            <div className="h-px flex-1 bg-slate-800" />
          </div>

          <button
            type="button"
            onClick={handleQrToggle}
            className="block w-full rounded-2xl border border-orange-500 py-3.5 text-base font-semibold text-orange-300 transition-colors hover:bg-orange-500/10"
          >
            {isQrVisible ? 'Ocultar QR' : 'Accesar por medio de QR'}
          </button>

          {isQrVisible ? (
            <div className="mt-6 rounded-3xl border border-slate-800 bg-black/25 p-5">
              <p className="text-center text-sm text-slate-400">
                Escanea con tu app movil
              </p>

              <div className="mt-4 flex min-h-[280px] items-center justify-center rounded-[1.5rem] bg-white p-4">
                {qrStatus === 'loading' ? (
                  <div className="text-center">
                    <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-orange-500" />
                    <p className="text-sm font-medium text-slate-700">
                      Generando QR...
                    </p>
                  </div>
                ) : qrImageUrl ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={qrImageUrl}
                      alt="QR para iniciar sesion web"
                      className="h-[220px] w-[220px] rounded-2xl"
                    />
                  </>
                ) : (
                  <p className="text-sm text-slate-500">
                    No hay QR disponible.
                  </p>
                )}
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm font-medium text-white">
                  {getQrStatusLabel(qrStatus)}
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  Caduca en {formatCountdown(secondsLeft)}
                </p>
              </div>

              {qrError ? (
                <p className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-center text-red-300">
                  {qrError}
                </p>
              ) : null}

              <button
                type="button"
                onClick={startQrLogin}
                className="mt-4 block w-full rounded-2xl border border-slate-700 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-orange-500 hover:text-orange-300"
              >
                Generar otro QR
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
