import { getExisting } from "./http";

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
export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private shapes: Shape[];
  private roomId: string;
  private clicked: boolean;
  socket: WebSocket;
  private startX= 0;
  private startY= 0;
  private selectedTool: string = '';

  constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.shapes = [];
    this.roomId = roomId;
    this.socket = socket;
    this.clicked = false;
    this.init();
    this.initMsg();
    this.initMousehandler();
    this.initclearCanva;
   }

  setTool(tool: string){
    this.selectedTool = tool;
  }

  async init() {
    this.shapes = await getExisting(this.roomId);
    console.log("shapes", this.shapes);
    
    this.initclearCanva();
  }

  initMsg() {
    this.socket.onmessage = (e) => {
      const parsedData = JSON.parse(e.data);
      if ((parsedData.type = "chat")) {
        const shape = JSON.parse(parsedData.message);
        this.shapes.push(shape);
        this.initclearCanva();
      }
    };
  }

  initclearCanva() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.shapes.map((shape) => {
      if (shape.type == "rect") {
        this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      } else if (shape.type == "circle") {
        this.ctx.beginPath();
        this.ctx.arc(shape.x, shape.y, shape.radus, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.closePath();
      }
    });
  }

  initMousehandler() {
    this.canvas.addEventListener("mousedown", (e) => {        
      this.clicked = true;
      this.startX = e.clientX;
      this.startY = e.clientY;
    });

    this.canvas.addEventListener("mouseup", (e) => {
      this.clicked = false;
      const width = e.offsetX - this.startX;
      const height = e.offsetY - this.startY;
      const selectedTool = this.selectedTool;
      let shape: Shape | null = null;
      if (selectedTool == "rect") {
        shape = {
          type: "rect",
          width,
          height,
          x: this.startX,
          y: this.startY,
        };
      } else if (selectedTool == "circle") {
        const radus = Math.max(width, height) / 2;
        shape = {
          type: "circle",
          radus,
          x: this.startX + width / 2,
          y: this.startY + height / 2,
        };
      }

      if (!shape) {
        return;
      }
      this.shapes.push(shape);

      this.socket?.send(
        JSON.stringify({
          type: "chat",
          roomId: this.roomId,
          message: JSON.stringify(shape),
        })
      );
    });

    this.canvas.addEventListener("mousemove", (e) => {
      if (this.clicked) {
        const selectedTool = this.selectedTool;

        const width = e.clientX - this.startX;
        const height = e.clientY - this.startY;
        this.initclearCanva();
        this.ctx.strokeStyle = "#ffffff";
        if (selectedTool == "rect") {
          this.ctx.strokeRect(this.startX, this.startY, width, height);
        } else if (selectedTool == "circle") {
          const x = this.startX + width / 2;
          const y = this.startY + height / 2;
          const radus = Math.max(width, height) / 2;
          this.ctx.beginPath();
          this.ctx.arc(x, y, radus, 0, 2 * Math.PI);
          this.ctx.stroke();
          this.ctx.closePath();
        }
      }
    });
  }
}
