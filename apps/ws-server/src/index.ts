import  {WebSocketServer}  from "ws";
import  Jwt, { JwtPayload }  from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

const wss = new WebSocketServer({port: 5000});

wss.on("connection", (socket, request)=>{
    console.log("connection successfull");
    const url = request.url;
    if (!url) {
        return;
    }
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get("token") || "";

    const verify =  Jwt.verify(token, JWT_SECRET);

    if (!verify || !(verify as JwtPayload).userId) {
        wss.close();
        return;
    }

    socket.on("message",(e)=>{
        console.log("message :",e.toString());
    });

    // wss.clients.forEach((client)=>{
    //     client.send(`server ${e.toString()}`);
    // })
})