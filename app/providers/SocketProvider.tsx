'use client';

import React, { createContext, ReactNode, useMemo } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {

  const socket = useMemo(() => {
    return io("http://localhost:3000/"); 
  }, []);

  return (
   <SocketContext.Provider value={{socket}}>
    {children}
   </SocketContext.Provider>
  )

}


export const useSocket = () => React.useContext(SocketContext);
