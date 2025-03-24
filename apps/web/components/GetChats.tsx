import axios from 'axios'
import React from 'react'
import { BACKEND_URL } from '../app/config'

const getChats = async(roomId: string)=>{
    const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
    return response.data;
}
const GetChats = async ({id}: {
    id: string
}) => {

    const messages = await getChats(id);
    console.log("messages", messages);
    
  return (
    <div>GetChats</div>
  )
}

export default GetChats