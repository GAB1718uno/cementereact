const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://cementerio.com.es:4000/api"; // Ajusta según tu configuración

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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuarios`, {
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

        /* const userData = {
          usuario: data.name!,
          uid: data.uid!,
          email: data.email!,
          avatar: data.avatar!,
        };
        localStorage.setItem("user", JSON.stringify(userData)); // Asegúrate de usar JSON.stringify
   */
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
    console.log("Paso la PRUEBA")

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

        // Guardar los datos del usuario en el localStorage como un objeto JSON
      const userData = {
        usuario: data.name!,
        uid: data.uid!,
        email: data.email!,
        avatar: data.avatar!,
      };
      localStorage.setItem("user", JSON.stringify(userData)); // Asegúrate de usar JSON.stringify



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

export async function registerUser(
  usuario: string,
  password: string,
  email: string,
  rol: string,
  estado: number
) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/usuarios/nuevo`
  //const url = `${process.env.NEXT_PUBLIC_API_URL}/usuarios/nuevo`;
  const body = { usuario, password, email, rol, estado };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("La response " + response);
      
      // Guardamos el token en localStorage
      localStorage.setItem("token", data.token);
      // Opcional: actualiza un contexto global o estado con la información del usuario
      return data;
    } else {
      throw new Error(data.msg || "Error al registrar usuario");
    }
  } catch (error: any) {
    console.error("Error en registerUser:", error);
    return { error: error.message };
  }
}




export default AuthService
