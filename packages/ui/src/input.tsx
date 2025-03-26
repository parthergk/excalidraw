import React from 'react'

interface Props{
  className?: string;
  placeholder: string;
  type: string;
}
const Input = ({className, placeholder, type}: Props) => {
  return (
    <input type={type} placeholder={placeholder} className={`px-1 py-2 bg-white text-black outline-none ${className}`} />
  )
}

export default Input