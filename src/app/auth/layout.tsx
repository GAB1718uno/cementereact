"use client"; // Necesario para usar el contexto


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <div className="overflow-y-scroll w-screen h-screen antialiased text-slate-700 selection:bg-blue-600 selection:text-white">
      <div className="flex">
        {/* Botón de Toggle y Sidebar */}
      
        {/* Contenedor principal que se desplaza cuando el sidebar está abierto */}
        <div >
          {children}
        </div>
      </div>
    </div>
  );
}
