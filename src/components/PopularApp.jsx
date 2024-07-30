"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import logol from '@/assets/loadinglogo.svg'
import Image from 'next/image';

function PopularApp() {

    const [apps,setApps]=useState([])
    const [loading,setLoading]=useState(false)
 

  useEffect(() => {
    setLoading(true) 
    searchfun()
  },[]);

 const searchfun = ()=>{
  
         axios.get("/api/apps").then((responce) => {
            setApps(responce.data.apps)
            setLoading(false)
        }).catch((error) => {
          console.log(error.response.statusText);
          setLoading(false)
        });
        setApps([])  
    }

    

  return (
    <div className='mb-10 max-w-[1400px] mx-auto'>
        <h1 className="text-2xl pl-3 my-5 font-bold text-blue-500 ">Popular Apps</h1>
        {
          loading?<div className='flex justify-center '><Image priority alt='logo' className='' width={300} height={300} src={logol} style={{ width: "auto", height: "auto" }}/></div>:
        
      <div className=' mx-auto max-w-[1400px] grid sm:grid-cols-2 md:grid-cols-3'>
        
        {
            apps.map((data)=>{
                return (
                    <div key={data.name} className='flex justify-between p-4 m-3 border rounded-lg items-center '>
                        
                        <div className='flex items-center gap-5'>
                        <div className='w-14 h-14 bg-gray-200 rounded-md'>
                            
                        </div>
                                <div>
                                <h2 className='text-lg font-semibold'>{data.name}</h2>
                                <p className='text-sm'>{data.title}</p>
                                </div>    
                         
                        </div>
                        
                        <button>👍{data.likes.length}</button>
                    </div>
                )
    
            })
        }
      </div>}
    </div>
  )
}

export default PopularApp
