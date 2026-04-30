import { io } from "socket.io-client"

export const socket = io("http://192.168.1.16:3000", {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5
})