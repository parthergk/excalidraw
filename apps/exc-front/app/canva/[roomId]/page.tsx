"use client";
import React, { useEffect, useRef } from "react";

const Canva = ({ params }: { params: string }) => {
  const canvaRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvaRef.current) {
      const canvas = canvaRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return;
      }
      let clicked = false;
      let startX = 0;
      let startY = 0;
      canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        console.log("down x", e.clientX);
        startX = e.clientX;
        console.log("down y", e.clientY);
        startY = e.clientY;
      });

      canvas.addEventListener("mouseup", (e) => {
        clicked = false;
        // const width = e.clientX - startX;
        // const height = e.clientY - startY;
        // ctx.strokeRect(startX, startY, width, height);
      });
      canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
          const width = e.clientX - startX;
          const height = e.clientY - startY;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.strokeStyle = "#ffffff";
          ctx.strokeRect(startX, startY, width, height);
        }
      });
    }
  }, [canvaRef]);
  return (
    <div>
      <canvas ref={canvaRef} width={1350} height={600}></canvas>
    </div>
  );
};

export default Canva;
