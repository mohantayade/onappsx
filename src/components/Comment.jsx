"use client"
import React, { useEffect,useState } from 'react'
import axios from 'axios';
import {useQuery} from 'react-query';

function Comment({appId}) {

  function timeAgo(timestamp) {
    const now = new Date();
    const date = new Date(timestamp);
    const secondsAgo = Math.floor((now - date) / 1000);

    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'week', seconds: 604800 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 }
    ];

    for (const interval of intervals) {
        const time = Math.floor(secondsAgo / interval.seconds);
        if (time > 1) {
            return `${time} ${interval.label}s ago`;
        } else if (time === 1) {
            return `${time} ${interval.label} ago`;
        }
    }

    return 'just now';
}

  const fetchComments = async () => {
    const response = await axios.get(`/api/apps/details${appId}/getcomm`);
    return response.data;
  }
  const { data, isLoading,refetch} = useQuery("comments", fetchComments);

 


  const [textarea ,setTextarea] = useState('')
const datas ={
  comment:textarea
}
  const token = localStorage.getItem('token')
  const [userlogin,setUserlogin]=useState(true)
    
    useEffect(() => {
      if (token) {
        setUserlogin(false);
      }
    }, [token]);

  
  const addComments = async () => {
    const response = await axios.post(`/api/apps/details${appId}/addcomm?token=${token}`,datas);
    console.log(response);
    refetch()
    return response.data;
  }


  if (isLoading) {
    return <div>loading</div>
  }
  return (
    <div>
        <div className='mx-5  my-2 flex border-blue-500 border-2 p-4 rounded-lg'>
            
    <div className='w-14 h-12 mr-2 bg-pink-400 rounded-full'></div>
    <textarea onChange={(e)=>setTextarea(e.target.value)} className='border-none outline-none py-2 w-[100%] h-[120px]' placeholder='What do you think?'></textarea>
    
</div>
<div className='flex justify-end'>
     <button onClick={addComments} disabled={userlogin} className='mr-5 px-5 py-3 bg-blue-500 text-white font-semibold text-lg rounded-lg disabled:opacity-50'>Comment</button>  
</div>
<p className='text-center pt-2 text-gray-400 italic text-sm'>note: if you want to comment plese log in</p>
<div className='mx-5'>
  <hr className='my-4' />
  <div className='text-blue-500 text-2xl font-bold'>Comments ({data.length})</div>

{

  data.map((item)=>{
  
    const date = new Date(item.timestamp)
    const localdate = timeAgo(date)
  
    return(
      <div>
    <div className='flex my-4'>
      <div className='bg-gray-500 rounded-full h-[40px] w-[40px] flex-shrink-0'></div>
      <div className='ml-2'>
      <h3 className='font-bold '>{item.name} <span className=' italic text-[12px] text-gray-600'> {localdate}</span></h3>
      <p className='text-sm '>{item.comment}</p>
      </div>
    </div>
    <hr />
    </div>
      
    )
  })
}

</div>
</div>
  )
}

export default Comment