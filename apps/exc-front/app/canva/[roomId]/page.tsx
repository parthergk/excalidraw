"use client";
import Canvas from "@/components/Canvas";
import { WS_URL } from "@/config";
import React, { use, useEffect, useState } from "react";

const Canva = ({ params }: { params:Promise<{roomId: string }>}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const {roomId} =  use(params);
  
  useEffect(()=>{
    const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMDFmMWYxNi01ZDQyLTRiNTgtODg5NC0wZDMzN2ViOWNlMDkiLCJpYXQiOjE3NDI4NzcxMjV9.E7Adopmt2eLe69jqtckq_9Dcn_Ngb1BKOEkwXn0t_jE`);
    ws.onopen = ()=>{
      setSocket(ws);
      ws.send(JSON.stringify({
        type: "join_room",
        roomId
      }));
    }

    // return(
    //   ws.close()
    // )
  },[]);
  if (!socket) {
    return <div>Connecting to server...</div>
    }    
  return (
    <div>
      <Canvas roomId={roomId} socket={socket}/>
    </div>
  );
};

export default Canva;
