import axios from 'axios'
import React,{useState,useEffect} from 'react'

export default function Account(props){
    const [user,setUser] = useState({})

    useEffect(() =>{
        axios.get('http://dct-user-auth.herokuapp.com/users/account',{
            headers : {
                "x-auth" : localStorage.getItem('token')
            }
        })
        .then((response) =>{
            const res=response.data
            setUser(res)
        })
        .catch((err) =>{
            alert(err.message)
        })
    },[])

    return (
        <div>
            <h2>User Account</h2>
            <p>Email - {user.email}</p>
            <p>Username - {user.username}</p>
        </div>
    )
}