import { useState } from "react";

export default function Fila() {
  const [filas, setFilas] = useState([
    { id: 1, nome: "Fila Geral" },
    { id: 2, nome: "Prioridade" },
  ]);

  const [novaFila, setNovaFila] = useState("");

  function adicionarFila() {
    if (!novaFila.trim()) return;

    const nova = {
      id: Date.now(),
      nome: novaFila,
    };

    setFilas((prev) => [...prev, nova]);
    setNovaFila("");
  }

  function atualizarFila(id) {
    const novoNome = prompt("Novo nome da fila:");
    if (!novoNome) return;

    setFilas((prev) =>
      prev.map((fila) =>
        fila.id === id ? { ...fila, nome: novoNome } : fila
      )
    );
  }

  function removerFila(id) {
    setFilas((prev) => prev.filter((fila) => fila.id !== id));
  }

  return (
    <div className="p-6 space-y-6">

      {/* Criar nova fila */}
      <div className="flex gap-2">
        <input
          value={novaFila}
          onChange={(e) => setNovaFila(e.target.value)}
          placeholder="Nome da nova fila"
          className="border p-2 rounded w-full"
        />

        <button
          onClick={adicionarFila}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Criar
        </button>
      </div>

      {/* Lista de filas */}
      <div className="space-y-2">
        {filas.map((fila) => (
          <div
            key={fila.id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <span>{fila.nome}</span>

            <div className="flex gap-2">
              <button
                onClick={() => atualizarFila(fila.id)}
                className="text-yellow-600"
              >
                Editar
              </button>

              <button
                onClick={() => removerFila(fila.id)}
                className="text-red-600"
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}