import { useEffect, useState } from "react";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/api";
import { useAuth } from "../../context/AuthProvider";

export default function Login( )
{
  const context = useAuth( );

  useEffect(() => {
    context.logout();
  }, []);

  const [email, setEmail] = useState("joao@email.com");
  const [senha, setSenha] = useState("123456");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const response = await login( email, senha);

      const { token, usuario } = response;

      context.login(token, usuario);

      navigate("/d");
    } catch (err) {
      setErro("Email ou senha inválidos");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginBox} onSubmit={handleLogin}>
        <h2>Login</h2>

        {erro && <p className={styles.erro}>{erro}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}