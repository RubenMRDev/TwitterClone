import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AtSign, Lock, Eye, EyeOff } from "lucide-react"
import { useAuth } from "../lib/contexts/auth-context"

export function LoginForm() {
  const navigate = useNavigate()
  const { login, loginWithGoogle } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      // Asumiendo que username es un email en este caso
      await login(formData.username, formData.password)
      // Limpiar el formulario después de un inicio de sesión exitoso
      setFormData({
        username: "",
        password: "",
        rememberMe: formData.rememberMe
      })
      navigate("/")
    } catch (error) {
      setError("Error al iniciar sesión: credenciales incorrectas")
      console.error("Error de inicio de sesión:", error)
    } finally {
      setLoading(false)    }
  }
  
  const handleGoogleSignIn = async () => {
    try {
      setError("")
      setLoading(true)
      await loginWithGoogle()
      // Limpiar el formulario después de un inicio de sesión exitoso con Google
      setFormData({
        username: "",
        password: "",
        rememberMe: formData.rememberMe
      })
      navigate("/")    } catch (error: any) {
      let errorMessage = "Error al iniciar sesión con Google"
      
      // Mensajes más específicos para diferentes tipos de errores
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = "Ventana emergente cerrada antes de completar la autenticación"
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = "La ventana emergente fue bloqueada por el navegador"
      } else if (error.code === 'auth/cancelled-popup-request') {
        errorMessage = "Solicitud de ventana emergente cancelada"
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = "Error de red. Comprueba tu conexión a internet"
      } else if (error.message && error.message.includes("permissions")) {
        errorMessage = "Error de permisos. No se pudo completar la operación"
      }
      
      setError(errorMessage)
      console.error("Error de inicio de sesión con Google:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const googleButton = document.getElementById("google-signin-button")
    if (googleButton) {
      googleButton.addEventListener("click", handleGoogleSignIn)
    }
    return () => {
      const googleButton = document.getElementById("google-signin-button")
      if (googleButton) {
        googleButton.removeEventListener("click", handleGoogleSignIn)
      }
    }
  }, [])

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-md p-3 text-sm">
          {error}
        </div>
      )}
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <AtSign className="h-5 w-5 text-gray-500" />
        </div>
        <input
          type="email"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Correo electrónico"
          className="bg-black border border-gray-800 text-white rounded-md py-3 pl-10 pr-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Lock className="h-5 w-5 text-gray-500" />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Contraseña"
          className="bg-black border border-gray-800 text-white rounded-md py-3 pl-10 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
        </button>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="rememberMe"
          name="rememberMe"
          checked={formData.rememberMe}
          onChange={handleChange}
          className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-800 rounded"
        />
        <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-400">
          Recordar mi sesión
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-md transition-colors disabled:opacity-70"
      >
        {loading ? "Iniciando sesión..." : "Iniciar sesión"}
      </button>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-800"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-black text-gray-500">O</span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="w-full flex justify-center items-center gap-3 bg-transparent hover:bg-gray-900 text-white font-medium py-3 px-4 border border-gray-800 rounded-md transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continuar con Google
      </button>
    </form>
  )
}
