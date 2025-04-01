import { drawShape } from "@/draw";
import React, { useEffect, useRef, useState } from "react";
import ShapeBar from "./ShapeBar";
import { Circle, PencilLine, RectangleHorizontal } from "lucide-react";
import { Game } from "@/draw/Game";

const Canva = ({ socket, roomId }: { socket: WebSocket; roomId: string }) => {
  const canvaRef = useRef<HTMLCanvasElement>(null);
  const [selectedTool, setSelectedTool] = useState<string>("");
  const [game, setGame] = useState<Game>();

  useEffect(() => {
    game?.setTool(selectedTool);
  }, [selectedTool, game]);

  useEffect(() => {
    if (canvaRef.current) {
      const g = new Game(canvaRef.current, roomId, socket);
      setGame(g);
      // return()=>{
      //   g.destroy();
      // }
    }
  }, [canvaRef]);
  return (
    <div>
      <canvas ref={canvaRef} width={1350} height={670}></canvas>
      <div className=" flex gap-5 absolute top-5 left-5 text-white px-2 py-1 border">
        <Circle
          onClick={() => setSelectedTool("circle")}
          className={` hover:bg-neutral-700 hover:cursor-pointer ${selectedTool === "circle" ? "bg-neutral-800" : ""}`}
        />
        <RectangleHorizontal
          onClick={() => setSelectedTool("rect")}
          className={` hover:bg-neutral-700 hover:cursor-pointer ${selectedTool === "rect" ? "bg-neutral-800" : ""}`}
        />
        <PencilLine
          onClick={() => setSelectedTool("line")}
          className={` hover:bg-neutral-700 hover:cursor-pointer ${selectedTool === "line" ? "bg-neutral-800" : ""}`}
        />
      </div>
    </div>
  );
};

export default Canva;
