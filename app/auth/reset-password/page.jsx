"use client"               // 1️⃣ siempre en la línea 1
export const dynamic = "force-dynamic"  // 2️⃣ justo después del "use client"
import { useState } from "react"       // 3️⃣ ahora sí vienen las importaciones
import { useRouter, useSearchParams } from "next/navigation"

export default function ResetPasswordPage() {
  const router = useRouter()
  const params = useSearchParams()
  const token  = params.get("token")

  const [password, setPassword] = useState("")
  const [confirm, setConfirm]   = useState("")
  const [error, setError]       = useState("")
  const [success, setSuccess]   = useState(false)
  const [loading, setLoading]   = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!password || password !== confirm) {
      setError("Las contraseñas no coinciden")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      })
      const data = await res.json()
      if (res.ok) {
        setSuccess(true)
        setTimeout(() => router.replace("/Login"), 2000)
      } else {
        setError(data.message || "Error al restablecer contraseña")
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl text-green-500">
          Contraseña restablecida con éxito. Redirigiendo…
        </h2>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-xl font-bold mb-4">Restablecer contraseña</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <label className="block mb-2">
          Nueva contraseña
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mt-1 p-2 border rounded"
          />
        </label>

        <label className="block mb-4">
          Confirmar contraseña
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            className="w-full mt-1 p-2 border rounded"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Procesando…" : "Restablecer contraseña"}
        </button>
      </form>
    </div>
  )
}
