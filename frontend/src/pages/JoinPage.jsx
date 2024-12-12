import React, { useState } from 'react'
import axios from "axios"

import { useNavigate } from "react-router-dom";


const JoinPage = () => {
    const [name, setName] = useState('')
    const[room,setRoom] = useState('')
    const navigate = useNavigate()
    const handleSubmit = (e)=>
    {
        e.preventDefault()
        navigate(`/home?name=${name}&room=${room}`)   
    }

  return (
    <div>
     <form className="room-form">
        <input placeholder="Name" type='text' onChange={(e)=>setName(e.target.value)} required/>
        <input placeholder="Room" type='text' onChange={(e)=>setRoom(e.target.value)} required/>
        <button type='sumbit' onClick={handleSubmit}>Send</button>
      </form>
    </div>
  )
}

export default JoinPage
