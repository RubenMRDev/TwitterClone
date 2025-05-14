import { Link } from "react-router-dom";
import { LoginForm } from "../components/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
            {/*  */}
        </div>

        <h1 className="text-white text-3xl font-bold text-center mb-8">Iniciar sesión en Twitter</h1>

        <LoginForm />

        <div className="mt-8 flex flex-col space-y-4">
          <Link to="#" className="text-blue-500 hover:underline text-center">
            ¿Olvidaste tu contraseña?
          </Link>

          <div className="text-gray-500 text-center">
            ¿No tienes una cuenta?{" "}
            <Link to="#" className="text-blue-500 hover:underline">
              Regístrate
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
