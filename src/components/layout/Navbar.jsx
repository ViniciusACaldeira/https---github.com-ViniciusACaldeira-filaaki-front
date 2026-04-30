import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel
} from "@/components/ui/select";

import { Bell, Play, Pause, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { getFilas, chamarProximo } from "@/services/api";
import Acoes from "../fila/acoes";

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      
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

        <Avatar>
          <AvatarFallback>VA</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}