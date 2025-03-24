'use client';
import Image from "next/image"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import authService from '@/app/services/authService';
import cementerio from "@/assets/images/cementerio.png"
import {useRouter} from "next/navigation"
import AuthService from "@/app/services/authService";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const success = await authService.login(email, password);
    
      if (success===true) {
        // Redireccionar o actualizar el estado global de autenticación
        console.log({success})
        console.log('Login exitoso');

        router.push("/dashboard/main");
      }
        
    else {
      toast.error("Contraseña o email incorrectos")
      console.log(success)
    }
 
  }

   useEffect(() => {
      // Limpiar el localStorage al cargar la aplicación
      localStorage.removeItem("token");
      AuthService.usuario = null;
      console.log("LocalStorage limpiado al inicio. Se ha cargado");
    }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <Image
  src={cementerio}
  alt="Logo de cementerio.com.es"
  width={200}
  height={200}
  className="mx-auto mb-4"
/>
<div className="mt4"></div>
        <h1 className=" mt-10 text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
          >
            Acceder
          </button>
        </form>
      </div>
    </div>
  );
}
