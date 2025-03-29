import CanvaClient from '@/components/CanvaClient';
import React from 'react'

const CanvaPage = async({params}:{
    params: {
        roomId: string
    }
}) => {
    const {roomId} = await(params);    
  return (
    <div><CanvaClient roomId={roomId}/></div>
  )
}

export default CanvaPage