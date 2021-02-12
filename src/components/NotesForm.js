import React,{useState} from 'react'
import axios from 'axios'

const NotesForm=(props)=>{
    const { AddNote } = props
    const [title,setTitle] = useState('')
    const [body,setBody] = useState('')

    const handleChange=(e)=>{
        if(e.target.name === 'title'){
            setTitle(e.target.value)
        }else if(e.target.name === 'body'){
            setBody(e.target.value)
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            title : title,
            body : body
        }
        console.log(formData)
        axios.post('http://dct-user-auth.herokuapp.com/api/notes',formData,{
            headers : {
                "x-auth" : localStorage.getItem('token')
            }
        })
        .then((resp) =>{
            const res=resp.data
            console.log(res)
            if(Object.keys(res).includes('errors')){
                alert(res.message)
            }else{
                alert('successfully notes added')
                AddNote(formData)
                
            }            
        })
        .catch((err)=>{
            alert(err.message)
        })
        setTitle('')
        setBody('')
    }

    return (
        <div>
            <h2>Add Note</h2>

            <form onSubmit={handleSubmit}>
                <input 
                    type="text"  
                    placeholder="Title"
                    value={title}
                    onChange={handleChange}
                    name="title"
                /><br/>

                <textarea 
                    placeholder="Body"
                    value={body}
                    onChange={handleChange}
                    name="body"
                ></textarea><br/>

                <input 
                    type="submit"
                    value="save"
                />
            </form>

        </div>
    )
}

export default NotesForm