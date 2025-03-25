import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";


export function useSocket(){
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(()=>{
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMDFmMWYxNi01ZDQyLTRiNTgtODg5NC0wZDMzN2ViOWNlMDkiLCJpYXQiOjE3NDI4NzcxMjV9.E7Adopmt2eLe69jqtckq_9Dcn_Ngb1BKOEkwXn0t_jE`);
        ws.onopen = ()=>{
            setLoading(false);
            setSocket(ws);
        }
    },[])

    return {
        loading,
        socket
    }
}