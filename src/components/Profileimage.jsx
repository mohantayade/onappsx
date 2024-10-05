import axios from 'axios'
import Image from 'next/image'
import React from 'react'

function Profileimage (id) {
    const profileiamge = (id)=>{
        const result = axios.get('/api/user/profilepic',{id:id})
        console.log(result.response.data);
    }
    profileiamge(id)
  return (
    <Image width={40} height={40} src="https://res.cloudinary.com/mohantayade/image/upload/v1728124715/onappx/6471475eed9f54d5f8e199e262cacb46.jpg"/>
    
  )
}

export default Profileimage