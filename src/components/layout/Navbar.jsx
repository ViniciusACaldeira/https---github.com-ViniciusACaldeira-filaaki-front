import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Bell, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import Acoes from "@/components/fila/acoes.jsx";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const initials = user?.nome
    ? user.nome.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
    : "US";

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
      
      {/* ESQUERDA */}
      <h2 className="text-lg font-semibold">Dashboard</h2>

      {/* CENTRO */}
      <div className="flex items-center gap-5">
          <Acoes />
      </div>

      {/* DIREITA */}
      <div className="flex items-center gap-4">
        
        <Button variant="ghost" size="icon">
          <Bell size={18} />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="outline-none">
              <Avatar className="cursor-pointer hover:scale-105 transition">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-56 rounded-xl shadow-lg"
          >
            <DropdownMenuLabel className="flex flex-col">
              <span className="font-medium">
                {user?.nome || "Usuário"}
              </span>
              <span className="text-xs text-muted-foreground">
                {user?.email}
              </span>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => navigate("/perfil")}
              className="gap-2 cursor-pointer"
            >
              <User size={16} />
              Meu perfil
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="gap-2 text-red-600 focus:text-red-600 cursor-pointer"
            >
              <LogOut size={16} />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </header>
  );
}