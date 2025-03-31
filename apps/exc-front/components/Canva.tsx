import { drawShape } from "@/draw";
import React, { useEffect, useRef } from "react";
import ShapeBar from "./ShapeBar";
import { Circle, PencilLine, RectangleHorizontal } from "lucide-react";

const Canva = ({ socket, roomId }: { socket: WebSocket; roomId: string }) => {
  const canvaRef = useRef<HTMLCanvasElement>(null);
  function getShapeType(type: string) {
  }
  useEffect(() => {    
      if (canvaRef.current) {
        drawShape(canvaRef.current, roomId, socket);
      }
  }, [canvaRef]);
  return (
    <div>
      <canvas ref={canvaRef} width={1350} height={670}></canvas>
      <div className=" flex gap-5 absolute top-5 left-5 text-white px-2 py-1 border">
        <Circle
          onClick={() => getShapeType("circle")}
          className=" hover:bg-neutral-700 hover:cursor-pointer"
        />
        <RectangleHorizontal
          onClick={() => getShapeType("rect")}
          className=" hover:bg-neutral-700 hover:cursor-pointer"
        />
        <PencilLine
          onClick={() => getShapeType("line")}
          className=" hover:bg-neutral-700 hover:cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Canva;
