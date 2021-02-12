import React from 'react'
import axios from 'axios'
import swal from 'sweetalert'

export default function NotesList(props){
    const {_id,title,body,removeNote} = props

    const handleRemove=()=>{
        const confirmation=window.confirm('are you sure')
        if(confirmation){
            removeNote(_id)
        }
    }

    const handleNote=(e)=>{
        e.preventDefault()
        axios.get(`http://dct-user-auth.herokuapp.com/api/notes/${_id}`,{
            headers : {
                "x-auth" : localStorage.getItem('token')
            }
        })
        .then(response=>{
            const res=response.data
            swal(`Title : ${res.title}
                Body : ${res.body}    
            `)
        })
    }

    return(
        <div>
            <blockquote onClick={handleNote}>{title}-{body} </blockquote>
            <button onClick={handleRemove}>delete</button>
        </div>
    )
}