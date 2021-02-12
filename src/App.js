import React, { useState,useEffect } from 'react'
import NavBar from './components/NavBar'

export default function App(props){
  const [userLoggedIn,setUserLoggedIn] = useState(false)

  const handleAuth = () =>{
    setUserLoggedIn(!userLoggedIn)
  }

  useEffect(() =>{
    if(localStorage.getItem('token')){
      handleAuth()
    }
  },[])

  return  (
    <div>
      <h1>User Auth</h1>
      <NavBar userLoggedIn={userLoggedIn} handleAuth={handleAuth}/>
    </div>
  )
}