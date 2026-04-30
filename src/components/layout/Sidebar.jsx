import { useState } from "react";
import {
  Home,
  Users,
  Settings,
  BarChart3,
  Menu,
  Plus,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink, useLocation } from "react-router-dom";
import QrFila from "../fila/qrcode/QrFila";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [filaOpen, setFilaOpen] = useState(false);

  const location = useLocation();

  const baseItem =
    "w-full justify-start gap-2 relative transition rounded-md px-3 py-2";

  const isActiveRoute = (path) => location.pathname === path;

  const itemClass = (active) =>
    `${baseItem} ${
      active
        ? "bg-muted text-foreground font-medium before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-primary before:rounded-r-md"
        : "text-muted-foreground hover:bg-muted/70"
    }`;

  return (
    <aside
      className={`h-screen bg-white border-r flex flex-col p-4 transition-all duration-300 ${
        open ? "w-64" : "w-20"
      }`}
    >
      {/* TOPO */}
      <div>
        <div className="flex items-center justify-between mb-2">
          {open && <h1 className="text-xl font-bold">FilaAki</h1>}

          <button
            onClick={() => setOpen(!open)}
            className="p-1 hover:bg-muted rounded"
          >
            <Menu size={18} />
          </button>
        </div>

        {open && (
          <p className="text-sm text-muted-foreground mb-6">
            Gestão de Filas
          </p>
        )}

        <nav className="flex flex-col gap-1">

          {/* DASHBOARD */}
          <NavLink to="/d" end>
            <Button
              variant="ghost"
              className={itemClass(isActiveRoute("/d"))}
            >
              <Home size={18} />
              {open && "Dashboard"}
            </Button>
          </NavLink>

          {/* FILA (COM INDICADOR DE SUBMENU) */}
          <Button
            variant="ghost"
            onClick={() => setFilaOpen(!filaOpen)}
            className={itemClass(
              isActiveRoute("/d/fila") ||
              isActiveRoute("/d/fila/nova")
            )}
          >
            <Users size={18} />
            {open && (
              <div className="flex items-center justify-between w-full">
                <span>Fila</span>

                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    filaOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            )}
          </Button>

          {/* SUBMENU */}
          {filaOpen && open && (
            <div className="ml-6 flex flex-col gap-1 mt-1">

              <NavLink to="/d/fila">
                <Button
                  variant="ghost"
                  className={itemClass(isActiveRoute("/d/fila"))}
                >
                  <Plus size={16} />
                  Lista
                </Button>
              </NavLink>

              <NavLink to="/d/fila/nova">
                <Button
                  variant="ghost"
                  className={itemClass(isActiveRoute("/d/fila/nova"))}
                >
                  <Plus size={16} />
                  Nova fila
                </Button>
              </NavLink>

            </div>
          )}

          {/* RELATÓRIOS */}
          <NavLink to="/d/relatorio">
            <Button
              variant="ghost"
              className={itemClass(isActiveRoute("/d/relatorio"))}
            >
              <BarChart3 size={18} />
              {open && "Relatórios"}
            </Button>
          </NavLink>

          {/* CONFIGURAÇÕES */}
          <NavLink to="/d/configuracao">
            <Button
              variant="ghost"
              className={itemClass(isActiveRoute("/d/configuracao"))}
            >
              <Settings size={18} />
              {open && "Configurações"}
            </Button>
          </NavLink>

        </nav>
      </div>

      {/* RODAPÉ */}
      <div className="mt-auto flex flex-col items-center gap-3">
        {open && (
          <>
            <QrFila />

            <p className="text-xs text-muted-foreground text-center mt-2">
              © 2026 FilaAki
            </p>
          </>
        )}
      </div>
    </aside>
  );
}