"use client"
import axios from 'axios';
import React, { useState,useEffect } from 'react'

function Search() {
  const [query,setQuery]=useState("")
  const [loading,setLoading]=useState(false)
  const [searchResult,setSearchResult]=useState([])
 

  useEffect(() => {  
      searchfun() 
  },[query]);

 const searchfun = ()=>{
      
      if (query) {
        setLoading(true)
         axios.get("/api/apps/search", {
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



  


  return (
    <div className=' mb-16 mt-5'>
      <div className='mx-auto px-5 max-w-[500px] md:max-w-[800px] flex items-center gap-4'>
        <input onChange={(e)=>{
          setLoading(true)
          setTimeout(() => {
            setQuery(e.target.value)
            setLoading(false)
          }, 700); 
          }} placeholder='Search Apps' type="text" className='border-2 p-2 w-full rounded-xl' />
        <button onClick={searchfun} className='text-2xl'>🔍</button>
        
      </div>
      {
        !query?<div></div>:<div className='absolute right-0 left-0 mx-auto max-w-[400px] md:max-w-[500px] bg-white shadow-2xl rounded-xl py-3 h-auto '>
        {loading?<div className='text-center m-10 font-bold text-2xl'>loading..</div>:<>
          {!query?<div></div>:<div className=' px-5'>
            {
              0==searchResult.length?<div className='text-center m-10 font-bold text-2xl'>Search Not Found !!</div>:
              searchResult.map((data)=>{
                return (<div key={data._id} className='border-2 border-gray-400 my-2 p-2 rounded-lg'>
                  <p className='text-black font-semibold' >{data.name}</p>
                <p className='text-xs'>{data.title}</p></div>)
              })
            }
          </div>
            
          }</>}
          </div>
      }
      
    </div>
  )
}

export default Search
