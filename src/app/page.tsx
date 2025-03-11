import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/auth/login");

  //Ahora mismo la pagina ser´ña direccionada y no cargará lo siguiente
  return (
    <>
      <h1>Hola Next</h1>
    </>
  );
}
