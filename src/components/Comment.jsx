"use client"
import React, { useEffect,useState } from 'react'
import axios from 'axios';
import {useQuery} from 'react-query';
import tubeLoading from '@/assets/tube-spinner.svg'
import Image from 'next/image';
import MyModel from './MyModel'

function Comment({appId}) {

  const [showModelD, setShowModelD]=useState(false)
  const closeModelD = ()=> setShowModelD(false)
  const [commentapiid,setCommentapiid]=useState("")


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

  const [userData, setUserData] = useState()

    useEffect(() => {
      if (token) {
        setUserlogin(false);
        axios.get("/api/user/profile", {
          params: {
            token: token }
        }).then((responce) => {
         
          setUserData(responce.data.message._id)
          // setUser(responce.data.message)
          
         
        }).catch((error) => {
          console.log(error.response.statusText);
        })
      }
    }, [token]);
  
// console.log(userData._id);

  const addComments = async () => {
    if (textarea == '') {
      alert("Plese Enter comment ⤵️")
    }else{
    const response = await axios.post(`/api/apps/details${appId}/addcomm?token=${token}`,datas);
    console.log(response);
    alert(response.data.message)
    refetch()
    setTextarea('')
    return response.data;
  }
  }

  const deleteCommentApi = async (commentid) =>{
    setShowModelD(true)
    setCommentapiid(commentid);
    
  }
  const runDeleteCommentApi =async ()=>{
  const response = await axios.delete(`/api/apps/details${appId}/${commentapiid}/rmcomm?token=${token}`);
  console.log(response);
  // alert(response.data.message)
  refetch()
  setShowModelD(false)
  return response.data;
  }

  const mainDeleteModel = (
    <MyModel closeModel={closeModelD} /* mainfunction={mainfunction}*/ >
        <div className=''>

        <div className="flex  flex-col text-black w-[250px] md:w-[300px] ">
            <p className='text-center py-3 mx-2 md:mx-10 text-xl'>Are You Sure ?</p>
            <div className='flex gap-2 '>
            <button onClick={runDeleteCommentApi} className='text-lg font-bold p-3  rounded-lg text-white grow bg-red-500 hover:bg-red-800' >Yes</button>
            <button className='text-lg font-bold p-3 bg-blue-500 rounded-lg text-white grow hover:bg-blue-800' onClick={closeModelD}>NO</button>
            </div>
            
            </div>
        </div>
    </MyModel>
   );




// update commnet section

  const [showModel, setShowModel]=useState(false)
  const closeModel = ()=> setShowModel(false)
const [commentupd,setCommentupd]=useState({})
const [updateLoading,setUpdateLoading]=useState(false)
// const [clickupdatebtn,setClickupdatebtn]=useState(false)

const [messagesApi,setMessagesApi] =useState()

const inputChangeH = (e) => {
  // const { name, value } = e.target;
  setCommentupd(e.target.value);
};

  const updateCommentApi = (commentid) =>{

    setShowModel(true)
    setCommentapiid(commentid)
    
  }

  const editapi = async()=>{
    setUpdateLoading(true)
    const response = await axios.patch(`/api/apps/details${appId}/${commentapiid}/updtcomm?token=${token}`,{"comment":commentupd});
    setUpdateLoading(false)
    refetch()
    setMessagesApi(response.data.message)
    setTimeout(() => {
      setMessagesApi("")
      setShowModel(false)
    }, 3000);
    return response.data;
  }

  const mainModel = (
    <MyModel closeModel={closeModel} >
        <div>
        <div className="flex  flex-col text-black w-[250px] md:w-[300px] ">

            <p className='text-center py-3 mx-2 md:mx-10 text-xl'>Edit Comment</p>

            <div>
                      
                        <textarea
                            name='comment'
                            value={commentupd}
                            onChange={inputChangeH}
                            placeholder='Description'
                            className='border text-lg p-2 rounded-lg w-full my-1'
                        />
                    </div>
                    <p className='text-center font-bold text-red-500 p-2'>{messagesApi}</p>
            <div className='flex gap-2 '>
            <button onClick={editapi} className='text-lg font-bold p-3  rounded-lg text-white grow bg-red-500 hover:bg-red-800'>{updateLoading?"Updating..":"Update"}</button>
            <button className='text-lg font-bold p-3 bg-blue-500 rounded-lg text-white grow hover:bg-blue-800' onClick={closeModel}>Cancel</button>
            </div>
            
            </div>
        </div>
    </MyModel>
   );

// update section ends




  if (isLoading) {
    return <div><div className='flex flex-col justify-center items-center bg-white mx-auto max-w-[1000px] shadow-lg border rounded-lg my-10 h-[30vh]'><Image src={tubeLoading} width={100} height={100} alt='loadign' /></div></div>
  }

  const sortedComments = data.sort((a, b) => {
    if (a.userId === userData && b.userId !== userData) {
      return -1;
    } else if (a.userId !== userData && b.userId === userData) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <div>
        <div className='mx-5  my-2 flex border-blue-500 border-2 p-4 rounded-lg'>
            
    <div className='w-14 h-12 mr-2 bg-pink-400 rounded-full'></div>
    <textarea value={textarea} onChange={(e)=>setTextarea(e.target.value)} className='border-none outline-none py-2 w-[100%] h-[120px]' placeholder='What do you think?'></textarea>
    
</div>
<div className='flex justify-end'>
     <button onClick={addComments} disabled={userlogin} className='mr-5 px-5 py-3 bg-blue-500 text-white font-semibold text-lg rounded-lg disabled:opacity-50'>Comment</button>  
</div>
<p className='text-center pt-2 text-gray-400 italic text-sm'>note: if you want to comment plese log in</p>
<div className='mx-5'>
  <hr className='my-4' />
  <div className='text-blue-500 text-2xl font-bold'>Comments ({data.length})</div>

{

sortedComments.map((item, i)=>{
  
    const date = new Date(item.timestamp)
    const localdate = timeAgo(date)
  
    return(
      <div key={i}>
    <div className='flex my-4 justify-between items-center '>
      <div className='flex'>
      <div className='bg-gray-500 rounded-full h-[40px] w-[40px] flex-shrink-0'></div>
      <div className='ml-2 w-full '>
      <h3 className='font-bold flex items-center gap-1'>{item.name} <span className=' italic text-[12px] text-gray-600'> {localdate}</span> <div className='ml-2'>{userData==item.userId?<div className='flex gap-2'>
         <button
           onClick={()=>deleteCommentApi(item._id)}
           className='flex flex-col justify-center items-center p-4 border h-10 w-10 rounded-lg'>🗑️ <span className='text-[9px]'>Delete</span></button>
        <button
          onClick={()=>{updateCommentApi(item._id);setCommentupd(item.comment)}}
         className='flex flex-col justify-center items-center p-4 border h-10 w-10 rounded-lg'>✏️ <span className='text-[9px]'>Edit</span></button>
        </div>:<div></div>}</div></h3>
        {showModel && mainModel}
        
        
      <p className='text-sm '>{item.comment}</p>
      </div>
      </div>
      
      {showModelD && mainDeleteModel}

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