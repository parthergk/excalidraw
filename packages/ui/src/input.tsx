import React from 'react'

const Input = ({placeholder, type}: {placeholder: string, type: string}) => {
  return (
    <input type={type} placeholder={placeholder} className=' px-1 py-2 bg-white text-black outline-none' />
  )
}

export default Input