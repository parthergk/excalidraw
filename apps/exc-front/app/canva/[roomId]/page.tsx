"use client";
import { initDraw } from "@/draw";
import React, { useEffect, useRef } from "react";

const Canva = ({ params }: { params: string }) => {
  const canvaRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvaRef.current) {
      initDraw(canvaRef.current);
    }
  }, [canvaRef]);
  return (
    <div>
      <canvas ref={canvaRef} width={1350} height={600}></canvas>
    </div>
  );
};

export default Canva;
