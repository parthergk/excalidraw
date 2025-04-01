import { BACKEND_URL } from "@/config";
import axios from "axios";

export async function getExisting(roomId: string) {
    const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
    const data = response.data;
    const shapes = data.map((x: { msg: string }) => {
      return x.msg;
    });
    return shapes;
  }