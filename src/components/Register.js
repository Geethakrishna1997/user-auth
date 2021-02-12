import React,{useState} from 'react'
import axios from 'axios'
// import validator from 'validator'

export default function Register(props){
    const [username,setUserName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    // const [formErrors,setFormErrors] = useState({})

    // const validator=()=>{
    //     if(username.trim().length === 0){
    //         formErrors.username = 'username cannot be empty'
    //     }else if(email.trim().length === 0){
    //         formErrors.email = 'email cannot be empty'
    //     } else if((password.trim().length <= 7) && (password.trim().length >=109)){
    //         formErrors.password = 'password must contain 8 to 108 characters'
    //     }
    //   }

    const handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            username : username,
            email : email,
            password : password
        }
        // validator()

        axios.post('http://dct-user-auth.herokuapp.com/users/register',formData)
        .then((response) =>{
            const res=response.data
            if(res.hasOwnProperty('errors')){
                alert(res.message)
            }else {
                alert('successfully created user')
                props.history.push('/login')
            }
        })
        .catch((err) =>{
            console.log(err.message)
        })

    }

    const handleChange=(e)=>{
        if(e.target.name === 'username'){
            setUserName(e.target.value)
        }else if(e.target.name === 'email'){
            setEmail(e.target.value)
        }else if(e.target.name === 'password'){
            setPassword(e.target.value)
        }
    }

    return  (
        <div>
            <h2>Register with us</h2>

            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="enter username"
                    value={username}
                    onChange={handleChange}
                    name="username"
                />
                {/* {formErrors.username && <span>{formErrors.username}</span>} */}
                <br/>

                <input 
                    type="text"
                    placeholder="enter email"
                    value={email}
                    onChange={handleChange}
                    name="email"
                />
                {/* {formErrors.email && <span>{formErrors.email}</span>} */}
                <br/>        

                <input 
                    type="text"
                    placeholder="enter password"
                    value={password}
                    onChange={handleChange}
                    name="password"
                />
                {/* {formErrors.password && <span>{formErrors.password}</span>} */}
                <br/>
                <input type="submit" value="save" />
            </form>
            
      </div>
    )
  }