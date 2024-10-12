'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useSocket } from "./providers/SocketProvider";


export default function Home() {

const {socket} = useSocket()

useEffect(()=>{
console.log(socket);
socket!.on('hello',()=>{
  console.log('hello event');
})
},[])


  return (
     <div className="home_background">
              <nav className="flex items-center justify-between p-4 px-10">
                <p className="text-xl">LinkWave</p>
                <div>
                  <Link href="/log-in" className="p-2 px-4 border rounded-md border-white/50">
                    Log In
                  </Link>
                </div>
              </nav>

              <div className="p-10">
                {/* <p 
                className="text-4xl font-medium text-center mt-10 tracking-widest [mask-image:linear-gradient(to_right,transparent,black,transparent)]"
                >LISTEN WHAT THE WORLD IS LISTENING</p> */}
              </div>
     </div>
  );
}
