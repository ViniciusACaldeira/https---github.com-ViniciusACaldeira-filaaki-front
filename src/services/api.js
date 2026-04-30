import axios from "axios";

const API_URL = "http://192.168.1.16:3000"



export async function getFila(identificador) {
  const res = await fetch(`${API_URL}/fila/${identificador}`)
  return res.json()
}

export async function entrarNaFila(data) {
  const res = await fetch(`${API_URL}/fila/entrar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  return res.json()
}

export async function validarToken( token )
{
  const res = await fetch(`${API_URL}/auth/validar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ token: token })
  });

  return res.json( );
}

export async function login( email, senha )
{
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, senha })
  });
  return res.json();
} 

export async function getFilaAtual( token )
{
  const res = await fetch(`${API_URL}/fila/historico`, {
    method: "GET",
    headers: { "Content-Type": "application/json", "token": token }
  });

  return res.json();
}

/* APIS Privadas */

const api = axios.create({
  baseURL: API_URL
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("filaaki_token");

  if( token )
    config.headers.Authorization = `Bearer ${token}`;

  return config;
});


export async function getFilas( )
{
  const res = await api.get(`/fila`);

  return res.data;
}

export async function chamarProximo( codigo )
{
  console.log("Chamando próximo da fila:", codigo);
  const res = await api.post(`/senha/chamar`, { identificador: codigo });
  return res.data;
}