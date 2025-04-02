import React, { createContext, useMemo, useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export const SocketProvider = (props) => {
  const socket = useMemo(() => {
    const sock = io("https://connectsphere-production.up.railway.app", { // Adjust URL if needed
      transports: ["websocket"],
      withCredentials: true
    });
    sock.on("connect_error", (err) => {
      console.error("Socket.IO connection error:", err.message); // Add error logging
    });
    return sock;
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};