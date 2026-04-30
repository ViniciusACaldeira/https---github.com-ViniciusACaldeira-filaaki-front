import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFila, entrarNaFila } from "../../services/api";
import { socket } from "../../services/socket";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const audio = new Audio("/assets/chamada.mp3");

export default function Cliente() {
  const { sala } = useParams();

  const [fila, setFila] = useState(null);
  const [senha, setSenha] = useState(null);
  const [tipos, setTipos] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [minhaVez, setMinhaVez] = useState(false);

  useEffect(() => {
    async function init() {
      const data = await getFila(sala);

      if (data.erro) {
        setMensagem(data.erro);
        return;
      }

      setFila(data);

      setTipos(
        data.tipos || [
          { nome: "Comum", valor: "comum", icone: "👤" },
          { nome: "Preferencial", valor: "preferencial", icone: "⭐" }
        ]
      );
    }

    init();
  }, [sala]);

  async function pegarSenha(tipo) {
    try {
      await audio.play();
      audio.pause();
      audio.currentTime = 0;
    } catch {}

    const res = await entrarNaFila({
      identificador: sala,
      tipo
    });

    if (res.erro) {
      setMensagem(res.erro);
      return;
    }

    setSenha(res.senha);
    localStorage.setItem("senha", JSON.stringify(res.senha));

    if (!socket.connected) socket.connect();

    socket.emit("join_queue", { identificador: res.fila_codigo });
  }

  useEffect(() => {
    const handler = (senhaAtual) => {
      const minhaSenha = JSON.parse(localStorage.getItem("senha"));
      if (!minhaSenha) return;

      if (senhaAtual.id === minhaSenha.id) {
        audio.play().catch(() => {});
        navigator.vibrate?.([300, 100, 300]);
        setMinhaVez(true);
      }
    };

    socket.on("senha_chamada", handler);
    return () => socket.off("senha_chamada", handler);
  }, []);

  if (!fila) {
    return (
      <div className="flex items-center justify-center h-screen text-muted-foreground">
        {mensagem || "Carregando..."}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/40 flex flex-col items-center p-6 gap-8">

      {/* Título */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">{fila.nome}</h1>
        <p className="text-muted-foreground">Selecione o tipo de atendimento</p>
      </div>

      {/* Cards de tipos */}
      {!senha && (
        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          {tipos.map((t) => (
            <Card
              key={t.valor}
              onClick={() => pegarSenha(t.valor)}
              className="cursor-pointer p-6 flex flex-col items-center gap-2 hover:shadow-lg transition"
            >
              <div className="text-4xl">{t.icone || "🎟️"}</div>
              <p className="font-medium">{t.nome}</p>
            </Card>
          ))}
        </div>
      )}

      {/* Senha */}
      {senha && (
        <Card className="p-10 text-center w-full max-w-md">
          <p className="text-muted-foreground">Sua senha</p>

          <h1 className="text-6xl font-bold tracking-wider my-4">
            {senha.prefixo}
            {senha.numero}
          </h1>

          <Badge className="mx-auto" variant="secondary">Aguarde ser chamado</Badge>
        </Card>
      )}

      {mensagem && (
        <p className="text-red-500 text-sm">{mensagem}</p>
      )}

      {/* Overlay */}
      {minhaVez && (
        <div className="fixed inset-0 bg-green-600 text-white flex items-center justify-center text-4xl font-bold z-50 animate-pulse">
          🔔 SUA VEZ!
        </div>
      )}
    </div>
  );
}