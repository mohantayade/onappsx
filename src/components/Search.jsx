"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState,useEffect } from 'react'

function Search() {
const router = useRouter()
  const [query,setQuery]=useState("")
  const [loading,setLoading]=useState(false)
  const [searchResult,setSearchResult]=useState([])
 

  useEffect(() => { 
    
      searchfun() 
  },[query]);

 const searchfun = ()=>{
  if (query) {
    setShowModel(true) 
  }
  
      if (query) {
        
         axios.get("/api/apps/search",{
          params: {
            search: query }
        }).then((responce) => {
          
          setSearchResult(responce.data.apps)
          
          setLoading(false)
          
        }).catch((error) => {
          console.log(error.response.statusText);
        });
      }
        setSearchResult([])
       
      
    }

    const openApp =(id)=>{
      router.push(`/${id}`);
    }


    const [showModel, setShowModel]=useState(false)

    // const closeModel = ()=> setShowModel(false)


  return (
    <>
    <div className=' mb-16 mt-5 z-20'>
      
      <div className='mx-auto px-5 max-w-[500px] md:max-w-[800px] flex items-center gap-4 '>
        <input onChange={(e)=>{
          
          setTimeout(() => {
            setQuery(e.target.value)
            setLoading(false)
          }, 700); 
          }} placeholder='Search Apps' type="text" className='border-2 p-2 w-full rounded-xl z-10' />
        <button onClick={searchfun} className='text-2xl z-10'>🔍</button>
        
      </div>
      <div>{showModel?<div>{
        !query?<div></div>:<div className='absolute right-0 left-0 mx-auto max-w-[400px] md:max-w-[500px] bg-white shadow-2xl rounded-xl py-3 h-auto z-10'>
        {loading?<div className='text-center m-10 font-bold text-2xl'>loading..</div>:<>
          {!query?<div></div>:<div className=' px-5'>
            {
              0==searchResult.length?<div className='text-center m-10 font-bold text-2xl'>Search Not Found !!</div>:
              searchResult.map((data)=>{
                return (<div key={data._id} onClick={()=>openApp(data._id)} className='border-2 border-gray-400 my-2 p-2 rounded-lg cursor-pointer hover:bg-blue-200'>
                  <p className='text-black font-semibold' >{data.name}</p>
                <p className='text-xs'>{data.title}</p></div>)
              })
            }
            
          </div>
            
          }</>}
        
          </div>
      }</div>:<div></div>}</div>
      
       
    </div>
    {
      showModel?<div onClick={()=>setShowModel(false)} className="backdrop-blur-sm bg-black/10  fixed top-0 right-0 left-0 bottom-0 " ></div>:<div></div>
    }
     </>
  )
}

export default Search
