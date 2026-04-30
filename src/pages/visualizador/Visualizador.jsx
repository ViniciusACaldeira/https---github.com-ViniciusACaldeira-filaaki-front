import { useEffect, useRef, useState } from "react";
import styles from "./visualizador.module.css";
import { socket } from "../../services/socket"
import { validarToken } from "../../services/api";
import { useParams } from "react-router-dom";
import { getFilaAtual } from "../../services/api";

const falar = (senha, guiche) => {
    speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(
        `Senha ${senha}, dirigir-se ao ${guiche}`
    );
    msg.lang = "pt-BR";
    speechSynthesis.speak(msg);
};

export default function Viewer() {
  const [senhaAtual, setSenhaAtual] = useState("--");
  const [guiche, setGuiche] = useState("--");
  const [historico, setHistorico] = useState([]);
  const [hora, setHora] = useState("");
  const { token } = useParams()
  const [tokenValido, setTokenValido] = useState( false );
  const initialized = useRef(false);

  useEffect(() => {
    const atualizar = () => {
        const now = new Date();

        setHora(
            now.toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            })
        );
    };

    atualizar();
    const interval = setInterval(atualizar, 1000);

    return () => clearInterval(interval);
    }, []);

  useEffect( ( ) => {
    document.documentElement.requestFullscreen().catch(() => {});
    }, []);

  useEffect(() => {
    if( initialized.current ) 
      return;
    
    initialized.current = true;

    async function init( )
    {
      console.log("Token recebido:", token);
      if( !token )
      {
        setTokenValido( false );
        return;
      }

      const data = await validarToken( token );
      
      if( data.erro )
      {
        setTokenValido( false );
        return
      }
      else
      {
        setTokenValido( true );
        if (!socket.connected)
        {
            socket.connect( );
            socket.emit( "join_queue", { token: token, identificador: data.fila } );

            const fila = await getFilaAtual( token );
            if( fila.erro )
            {
              console.error("Erro ao obter fila atual:", fila.erro);
            }
            else
            {
              if( fila.senhasChamadas && fila.senhasChamadas.length > 0 )
              {
                const ultimas6 = fila.senhasChamadas.slice( 0, 6 );
                
                if( ultimas6.length > 0 )
                {
                  const primeira = ultimas6[ 0 ];
                  setSenhaAtual( `${primeira.prefixo}${primeira.numero}` );
                  
                  if( ultimas6.length > 1 )
                  {
                    const restantes = ultimas6.slice( 1 ).map( s => `${s.prefixo}${s.numero}` );
                    setHistorico( restantes );
                  }
                }
              }
            }
        }

        const handler = (data) => {
            atualizarSenha(data);
        };

        socket.off("senha_chamada", handler)
        socket.on("senha_chamada", handler)
      }
    }
    
    init( );

    return () => {
      socket.off("senha_chamada");
    };
  }, []);

  const atualizarSenha = (data) => {
    const senha = `${data.prefixo}${data.numero}`;

    setSenhaAtual(senha);
    setGuiche("barbeiro");

    // Atualiza histórico (máx 5)
    setHistorico((prev) => {
        const novo = [senha, ...prev];
        console.log("Histórico atualizado:", novo);
        return novo.slice(0, 5);
    });

    tocarSom();
    falarSenha(data.prefixo, data.numero);
  };

  // 🔊 Som
  const tocarSom = () => {
    const audio = new Audio("/alert.mp3");
    audio.play().catch(() => {});
  };

  // 🗣️ Voz
  const falarSenha = (prefixo, numero) => {
    const msg = new SpeechSynthesisUtterance(
      `Senha ${prefixo} ${numero}, dirigir-se ao barbeiro`
    );
    msg.lang = "pt-BR";
    speechSynthesis.speak(msg);
  };

  return (
    <div className={styles.viewer}>
      <header className={styles.header}>
        <div className={styles.logo}>FilaAki</div>
        <div className={styles.clock}>{hora}</div>
      </header>

      <section className={styles.current}>
        <span className={styles.label}>Senha atual</span>
        <div className={styles.senha}>{senhaAtual}</div>
        <div className={styles.guiche}>{guiche}</div>
      </section>

      <section className={styles.bottom}>
        <div className={styles.history}>
          <h3>Últimas chamadas</h3>
          <ul>
            {historico.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className={styles.ads}>
          <div className={styles.adContent}>
            <p>Espaço publicitário</p>
          </div>
        </div>
      </section>
    </div>
  );
}