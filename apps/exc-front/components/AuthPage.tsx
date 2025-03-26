import React from 'react'

const AuthPage = ({isSignin}: {isSignin: boolean}) => {
  return (
    <div>
        <h1>{isSignin ? "SignIn" : "SignUp"}</h1>
    </div>
  )
}

export default AuthPage