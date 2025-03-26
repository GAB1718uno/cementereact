"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/services/authService"; // Ajusta la ruta según tu estructura

export default function RegistroPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    usuario: "",
    password: "",
    email: "",
    rol: "rolUsuario", // valor por defecto, o "admin" si procede
    estado: 1,
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const result = await registerUser(
      formData.usuario,
      formData.password,
      formData.email,
      formData.rol,
      formData.estado
    );

    if (result.error) {
      setError(result.error);
    } else {
      // Registro exitoso, redirigir al dashboard u otra ruta
      router.push("/dashboard");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Registro de Usuario</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="usuario"
          placeholder="Nombre de usuario"
          value={formData.usuario}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          className="input"
          required
        />
        {/* Puedes agregar campos para rol y estado si lo deseas */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Registrar
        </button>
      </form>
    </div>
  );
}
