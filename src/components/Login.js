import React, { useState } from 'react'
import axios from 'axios'

export default function Login(props){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const handleSubmit=(e)=>{
    e.preventDefault()
    const formData={
      email : email,
      password : password
    }

    // if validations pass
    axios.post('http://dct-user-auth.herokuapp.com/users/login',formData)
      .then((response) =>{
        const res=response.data
        if(res.hasOwnProperty('errors')){ //Objects.keys(res).includes('errors')          
          alert(res.errors)
        }else{
          alert('successfully logged in')
          localStorage.setItem('token',res.token)
          props.history.push('/')
          props.handleAuth()
        }
      })
      .catch((err) =>{
        alert(err.message)
      })

  }

  const handleChange=(e)=>{
    if(e.target.name === "email"){
      setEmail(e.target.value)
    }else if(e.target.name === "password"){
      setPassword(e.target.value)
    }
  }

  return  (
      <div>
          <h2>Login</h2>

          <form onSubmit={handleSubmit}>

            <input 
              type="text"
              placeholder="enter email"
              value={email}
              onChange={handleChange}
              name="email"
            /><br/>

            <input 
              type="text"
              placeholder="enter password"
              value={password}
              onChange={handleChange}
              name="password"
            /><br/>

            <input type="submit" value="login" />
          </form>
      </div>
    )
  }