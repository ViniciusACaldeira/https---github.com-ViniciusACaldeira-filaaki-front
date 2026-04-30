export const isAuthenticated = () => {
  const token = localStorage.getItem("filaaki_token");
  return !!token;
};

export const getUsuario = () => {
  return JSON.parse(localStorage.getItem("filaaki_usuario"));
};