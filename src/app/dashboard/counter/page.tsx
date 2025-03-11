import { ContadorCarrito } from "@/shopping-cart/components";

export const metadata = {
  title: "Carrito de compras",
  description:
    "Cuenta de productos seleccionados o comprados, disponibles en carrito",
};

export default function CounterPage() {
  return (
    <>
      <div className=" flex flex-col items-center justify-center w-full h-full">
        <ContadorCarrito value={50} />
      </div>
    </>
  );
}
