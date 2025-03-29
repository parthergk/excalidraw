"use client"
import { WS_URL } from '@/config'
import React, { useEffect, useState } from 'react'
import Canva from './Canva';

const CanvaClient = ({roomId}: {roomId:string}) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    useEffect(()=>{
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMDFmMWYxNi01ZDQyLTRiNTgtODg5NC0wZDMzN2ViOWNlMDkiLCJpYXQiOjE3NDI4NzcxMjV9.E7Adopmt2eLe69jqtckq_9Dcn_Ngb1BKOEkwXn0t_jE`);
        ws.onopen = ()=>{
            setSocket(ws);
            ws.send(JSON.stringify({
                type: "join_room",
                roomId
            }));
        }
    },[])

    if (!socket) {
        return<div>connecting...</div>
    }
  return (
    <div><Canva socket={socket} roomId={roomId}/></div>
  )
}

export default CanvaClient