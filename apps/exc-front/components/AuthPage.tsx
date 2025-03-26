"use client"
import { Button } from '@repo/ui/button'
import Input from '@repo/ui/input'
import React from 'react'

const AuthPage = ({isSignin}: {isSignin: boolean}) => {
  return (
    <div className=' w-sm text-center p-2'>
        <h1>{isSignin ? "SignIn" : "SignUp"}</h1>
        <div className=' flex flex-col space-y-3 p-3 '>
        <Input type='text' placeholder='Enter email' className=' border rounded-sm'/>
        <Input type='password' placeholder='Enter password' className=' border rounded-sm'/>
        <Button children={isSignin ? "SignIn" : "SignUp"} onClick={()=>{console.log("hello");
        }} className=' border px-1 cursor-pointer rounded-sm' />
        </div>
    </div>
  )
}

export default AuthPage