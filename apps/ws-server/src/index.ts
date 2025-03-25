import  {WebSocketServer, WebSocket}  from "ws";
import  Jwt, { JwtPayload }  from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";

const wss = new WebSocketServer({port: 5000});

function verifyToken(token: string): string | null{
    try {
        const verify =  Jwt.verify(token, JWT_SECRET);

        if (typeof verify == "string") {
            return null;
        }

        if (!verify || !(verify as JwtPayload).userId) {
            return null;
        }

        return verify.userId;
    } catch (error) {
        return null
    }
}

interface User {
    socket: WebSocket,
    rooms: string[],
    userId: string
}

const users: User[] = [];


wss.on("connection",  (socket, request)=>{
    console.log("connection successfull");
    const url = request.url;
    if (!url) {
        return;
    }
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get("token") || "";
    const userId = verifyToken(token);
    
    if (userId == null) {
        socket.close();
        console.log("connection close successfull");
        return;
    }
    
    users.push({
        userId,
        rooms: [],
        socket
    })

    socket.on("message",async(e)=>{
        console.log("event", e.toString());
        const parsedData = JSON.parse(e.toString());
                
        if (parsedData.type == "join_room") {
            const user = users.find(x => x.socket === socket);
            user?.rooms.push(parsedData.roomId);
        }

        if (parsedData.type === "leave_room") {
            const user = users.find(x => x.rooms == parsedData.roomId);
            if (!user) {
                return
            }       
            user.rooms = user.rooms.filter(x => x !== parsedData.roomId)
        }

        if (parsedData.type === "chat") {
            const roomId = parsedData.roomId;
            const message = parsedData.message;

            await prismaClient.chat.create({
                data: {
                 roomId: Number(roomId),
                 msg:message,
                 adminId: userId 
                }
            });

            users.forEach(user => {
                console.log("user id in side for each", user.userId);
                if (user.rooms.includes(roomId)) {
                    user.socket.send(JSON.stringify({
                        type: "chat",
                        message: message,
                        roomId
                    }))
                }
            })
        }
    });

    // wss.clients.forEach((client)=>{
    //     client.send(`server ${e.toString()}`);
    // })
})