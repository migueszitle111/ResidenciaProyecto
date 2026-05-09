'use client';

import { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';

const POLL_INTERVAL_MS = 3_000;

// Componente invisible que se monta en el layout cuando el usuario tiene
// sesión iniciada via QR. Cada 15 s consulta si la sesión fue revocada
// desde la app móvil y, si es así, cierra la sesión del navegador.
export default function QrSessionGuard() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== 'authenticated' || !session?.qrChallengeId) return;

    let active = true;
    let timeoutId;

    const check = async () => {
      try {
        const res = await fetch('/api/auth/qr/check-revocation', {
          cache: 'no-store',
        });
        if (!active) return;

        if (res.ok) {
          const data = await res.json();
          if (data?.revoked) {
            await signOut({ redirect: true, callbackUrl: '/Login' });
            return;
          }
        }
      } catch {
        // Ignorar errores de red; se reintenta en el próximo tick
      }

      if (active) {
        timeoutId = setTimeout(check, POLL_INTERVAL_MS);
      }
    };

    check();

    return () => {
      active = false;
      clearTimeout(timeoutId);
    };
  }, [session?.qrChallengeId, status]);

  return null;
}
