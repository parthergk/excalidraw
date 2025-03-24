"use client"
import React, { useEffect } from 'react'

const ChatClient = ({id ,messages}: {
    id: string,
    messages: {msg:string}[]
}) => {

    useEffect(()=>{

    },[id]);

  return (
    <div>{
        messages.length !== 0 ? messages.map((m)=><div>{m.msg}</div>) : "no message"
    }</div>
  )
}

export default ChatClient