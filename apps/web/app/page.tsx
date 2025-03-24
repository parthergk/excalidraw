"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");
  return (
    <div>
      <input type="text" value={roomId} onChange={(e)=> setRoomId(e.target.value)}/>
      <button onClick={()=>{
        router.push(`/room/${roomId}`);
      }}>join room</button>
    </div>
  );
}
