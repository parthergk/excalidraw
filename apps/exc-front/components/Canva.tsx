import { drawShape } from "@/draw";
import { Circle, PencilLine, RectangleHorizontal } from "lucide-react";
import React, { useEffect, useRef } from "react";

const Canva = ({ socket, roomId }: { socket: WebSocket; roomId: string }) => {
  const canvaRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvaRef.current) {
      drawShape(canvaRef.current, roomId, socket);
    }
  }, [canvaRef]);
  return (
    <div>
      <canvas ref={canvaRef} width={1350} height={670}></canvas>
      <div className=" flex gap-5 absolute top-5 left-5 text-white px-2 py-1 border">
        <Circle className=" hover:bg-neutral-700 hover:cursor-pointer"/>
        <RectangleHorizontal className=" hover:bg-neutral-700 hover:cursor-pointer"/>
        <PencilLine className=" hover:bg-neutral-700 hover:cursor-pointer"/>{" "}
      </div>
    </div>
  );
};

export default Canva;
