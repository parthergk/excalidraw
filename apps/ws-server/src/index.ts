import  {WebSocketServer}  from "ws";

const wss = new WebSocketServer({port: 5000});

wss.on("connection", (socket)=>{
    console.log("connection successfull");
    socket.on("message",(e)=>{
        console.log("message :",e.toString());
    });

    // wss.clients.forEach((client)=>{
    //     client.send(`server ${e.toString()}`);
    // })
})