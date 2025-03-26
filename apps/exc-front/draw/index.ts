import axios from "axios";

type Shape =
  | {
      type: "rect";
      width: number;
      height: number;
      x: number;
      y: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    };

export function initDraw(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket | null) {  
  const ctx = canvas.getContext("2d");
  getExistingShapes(roomId);
  
  let existingShapes: Shape[] = [];
  if (!ctx) {
    return;
  }
  let clicked = false;
  let startX = 0;
  let startY = 0;
  canvas.addEventListener("mousedown", (e) => {
    clicked = true;
    startX = e.clientX;
    startY = e.clientY;

  });

  canvas.addEventListener("mouseup", (e) => {
    clicked = false;
    const width = e.clientX - startX;
    const height = e.clientY - startY;
    // ctx.strokeRect(startX, startY, width, height);
    existingShapes.push({
      type: "rect",
      width,
      height,
      x: startX,
      y: startY,
    });
    
    // socket?.send(JSON.stringify({
    //   type: "chat",
    //   message: JSON.stringify({
    //     type: "rect",
    //     width,
    //     height,
    //     x: startX,
    //     y: startY,
    //   }),
    //   roomId
    // }))
  });
  canvas.addEventListener("mousemove", (e) => {
    if (clicked) {
      const width = e.clientX - startX;
      const height = e.clientY - startY;
      clearCanva(canvas, ctx, existingShapes);
      ctx.strokeStyle = "#ffffff";
      ctx.strokeRect(startX, startY, width, height);
    }
});
}

function clearCanva(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
  existingShapes: Shape[]
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  existingShapes.map((shape) => {
      if (shape.type=="rect") {
          ctx.strokeStyle = "#ffffff";
          ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      }
  });
}

async function getExistingShapes(roomId: string) {
  // console.log("room id", roomId);
  // const response = await axios.get(`http://localhost:8080/chats/${roomId}`);
  return roomId;
}