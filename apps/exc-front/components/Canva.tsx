import { drawShape } from '@/draw';
import React, { useEffect, useRef } from 'react'

const Canva = ({socket, roomId}: {
    socket: WebSocket,
    roomId: string
}) => {
    const canvaRef = useRef<HTMLCanvasElement>(null);
    useEffect(()=>{
        if (canvaRef.current) {
            drawShape(canvaRef.current, roomId, socket);
        }
    },[canvaRef]);
  return (
    <div><canvas ref={canvaRef} width={1350} height={670}></canvas></div>
  )
}

export default Canva