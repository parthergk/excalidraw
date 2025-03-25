import React from 'react'

const AuthPage = ({isSignin}: {isSignin: boolean}) => {
  return (
    <div className=' bg-neutral-700 flex flex-col w-md p-3 border border-black space-y-1'>
        <h1>{isSignin? "SignIn": "SignUp"}</h1>
        <input type="text" placeholder='Email' />
        <input type="password" placeholder='Password'  />
        <button >{isSignin? "SignIn": "SignUp"}</button>
    </div>
  )
}

export default AuthPage