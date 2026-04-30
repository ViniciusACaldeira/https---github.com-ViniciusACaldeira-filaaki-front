import { useNavigate } from "react-router-dom";
import style from "./home.module.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className={style.homeContainer}>
      <header className={style.homeHeader}>
        <h1>FilaAki</h1>
        <button onClick={() => navigate("/login")}>Acessar</button>
      </header>

      <section className={style.hero}>
        <h2>Gerencie filas de atendimento com facilidade</h2>
        <p>
          Organize atendimentos, reduza filas físicas e melhore a experiência do cliente.
        </p>

        <div className={style.heroButtons}>
          <button onClick={() => navigate("/login")}>Entrar no sistema</button>
          <button className={style.secondary}>Ver como funciona</button>
        </div>
      </section>

      <section className={style.features}>
        <div className={style.card}>
          <h3>📺 Painel para TV</h3>
          <p>Exiba senhas em tempo real para seus clientes.</p>
        </div>

        <div className={style.card}>
          <h3>📱 Acompanhamento</h3>
          <p>Clientes acompanham a fila pelo celular.</p>
        </div>

        <div className={style.card}>
          <h3>⚡ Atualização em tempo real</h3>
          <p>Utilizando WebSocket para respostas instantâneas.</p>
        </div>
      </section>

      <footer className={style.footer}>
        <p>© 2026 FilaAki - Sistema de Gestão de Filas</p>
      </footer>
    </div>
  );
}