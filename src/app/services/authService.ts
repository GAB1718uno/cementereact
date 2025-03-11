const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"; // Ajusta según tu configuración

export interface User {
  usuario: string;
  uid: string;
  email: string;
  avatar: string;
}

export interface AuthResponse {
  ok: boolean;
  token?: string;
  name?: string;
  uid?: string;
  email?: string;
  avatar?: string;
  msg?: string;
}

const AuthService = {
  usuario: {} as User | null,
  async login(email: string, password: string): Promise<boolean | string> {
    
    try {
      const res = await fetch(`${BASE_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      // Verificar si la respuesta es exitosa (código 2xx)
      if (!res.ok) {
        // Intentar extraer el mensaje de error del cuerpo de la respuesta
        const errorData = await res.json();
        return errorData.msg || "Error en el login";
      }
  
      const data: AuthResponse = await res.json();
  
      if (data.ok && data.token) {
        localStorage.setItem("token", data.token);
        AuthService.usuario = {
          usuario: data.name!,
          uid: data.uid!,
          email: data.email!,
          avatar: data.avatar!,
        };
        return true;
      }
  
      return data.msg || "Error en el login";
    } catch (error) {
      console.error("Error en login:", error);
      return "Error de conexión";
    }
  },  

  async validarToken(): Promise<boolean> {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const res = await fetch(`${BASE_URL}/usuarios/renuevo`, {
        method: "GET",
        headers: { "x-token": token },
      });

      const data: AuthResponse = await res.json();
      if (data.ok && data.token) {
        localStorage.setItem("token", data.token);
        AuthService.usuario = {
          usuario: data.name!,
          uid: data.uid!,
          email: data.email!,
          avatar: data.avatar!,
        };
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error validando token:", error);
      return false;
    }
  },

  logout() {
    localStorage.removeItem("token");
    AuthService.usuario = null;
  },
};

export default AuthService
