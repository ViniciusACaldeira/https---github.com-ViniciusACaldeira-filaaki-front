import { useState } from "react";

export default function NovaFila() {
  const [nome, setNome] = useState("");

  function salvar() {
    if (!nome.trim()) return;

    console.log("Criar fila:", nome);

    // depois aqui vai API POST
    setNome("");
  }

  return (
    <div className="p-6 max-w-md">
      <h1 className="text-xl font-bold mb-4">Nova Fila</h1>

      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="border p-2 w-full rounded"
        placeholder="Nome da fila"
      />

      <button
        onClick={salvar}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Criar
      </button>
    </div>
  );
}