import { BACKEND_URL } from "@/config";
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
      x: number;
      y: number;
      radus: number;
    };
export async function drawShape(
  canva: HTMLCanvasElement,
  roomId: string,
  socket: WebSocket
) {
  const ctx = canva.getContext("2d");
  // await getExisting(roomId);
  const shapes: Shape[] = [];
  if (!ctx) {
    return;
  }

  socket.onmessage = (e) => {
    const parsedData = JSON.parse(e.data);
    if ((parsedData.type = "chat")) {
      const shape = JSON.parse(parsedData.message);
      shapes.push(shape);
      clearCanva(canva, ctx, shapes);
    }
  };

  clearCanva(canva, ctx, shapes);
  let stratX = 0;
  let stratY = 0;
  let clicked = false;

  canva.addEventListener("mousedown", (e) => {
    clicked = true;
    stratX = e.offsetX;
    stratY = e.offsetY;
  });

  canva.addEventListener("mouseup", (e) => {
    clicked = false;
    const width = e.offsetX - stratX;
    const height = e.offsetY - stratY;
    shapes.push({
      type: "rect",
      width,
      height,
      x: stratX,
      y: stratY,
    });

    socket?.send(
      JSON.stringify({
        type: "chat",
        roomId,
        message: JSON.stringify({
          type: "rect",
          width,
          height,
          x: stratX,
          y: stratY,
        }),
      })
    );
  });

  canva.addEventListener("mousemove", (e) => {
    if (clicked) {
      //@ts-ignore;
      const selectedTool = window.selectedTool;

      const width = e.clientX - stratX;
      const height = e.clientY - stratY;
      clearCanva(canva, ctx, shapes);
      ctx.strokeStyle = "#ffffff";
      if (selectedTool == "rect") {
        ctx.strokeRect(stratX, stratY, width, height);
      } else if (selectedTool == "circle") {
        const x = stratX + width / 2;
        const y = stratY + height / 2;        
        const radus = Math.max(width, height)/2;
        ctx.beginPath();
        ctx.arc(x, y, radus, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
      }
      {
      }
    }
  });
}

function clearCanva(
  canva: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  shapes: Shape[]
) {
  ctx.clearRect(0, 0, canva.width, canva.height);
  shapes.map((shape) => {
    if (shape.type == "rect") {
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    }
  });
}

async function getExisting(roomId: string) {
  const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
  const data = response.data;
  const shapes = data.map((x: { msg: string }) => {
    return x.msg;
  });
  return shapes;
}
