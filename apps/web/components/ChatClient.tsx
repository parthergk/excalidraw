"use client";
import React, { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

const ChatClient = ({
  id,
  messages,
}: {
  id: string;
  messages: { msg: string }[];
}) => {
  const [chats, setChats] = useState(messages);
  const [currentChat, setCurrentChat] = useState("");
  const { loading, socket } = useSocket();
  useEffect(() => {
    if (socket && !loading) {
      socket.send(
        JSON.stringify({
          type: "join_room",
          roomId: id,
        })
      );

      socket.onmessage = (event)=>{
        const parsedData = JSON.parse(event.data);
        if (parsedData.type === "chat") {
          setChats(c => [...c, {msg: parsedData.message}])
        }
      }
    }
  }, [socket, loading, id]);

  return (
    <div>
      {chats.length !== 0
        ? chats.map((m) => <div key={m.msg}>{m.msg}</div>)
        : "no message"}
      <div>
        <input
          type="text"
          value={currentChat}
          onChange={(e) => setCurrentChat(e.target.value)}
        />
        <button onClick={()=>{
          socket?.send(JSON.stringify({
            type: "chat",
            roomId: id,
            message: currentChat
          }))
          setCurrentChat("");
        }}>send</button>
      </div>
    </div>
  );
};

export default ChatClient;
