import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { Outlet } from "react-router-dom";
import { FilaProvider } from "../../context/FilaProvider";

export default function Dashboard( )
{
  return (
    <FilaProvider>
      <div className="h-screen flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          {/* CONTEÚDO */}
          <main className="flex-1 overflow-auto p-6 bg-muted/40">
            <Outlet />
          </main>
        </div>
      </div>
    </FilaProvider>
  );
}