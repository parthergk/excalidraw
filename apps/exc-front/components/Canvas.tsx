"use client";
import { initDraw } from "@/draw";
import React, { useEffect, useRef } from "react";

interface Props {
  roomId: string;
  socket: WebSocket;
}

const Canvas = ({ roomId, socket }: Props) => {
  const canvaRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvaRef.current) {
      initDraw(canvaRef.current, roomId, socket);
    }
  }, [canvaRef]);
  return (
    <div>
      <canvas ref={canvaRef} width={1350} height={600}></canvas>
    </div>
  );
};

export default Canvas;
