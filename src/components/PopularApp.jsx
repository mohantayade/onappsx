"use client"
import axios from 'axios';
import React from 'react'
import logol from '@/assets/loadinglogo.svg'
import Image from 'next/image';
import {useQuery} from 'react-query';
import { useRouter } from 'next/navigation'


function PopularApp() {


    const fetchApps = async () => {
      const response = await axios.get("/api/apps");
      return response.data.apps;
    }
    const { data: apps = [], isLoading } = useQuery("apps", fetchApps);

    const router = useRouter()
    const openPage=(appid)=>{
      router.push(`/${appid}`, { scroll: false })
    }
    

  return (
   
    <div className='mb-10 max-w-[1400px] mx-auto'>
        <h1 className="text-2xl pl-3 my-5 font-bold text-blue-500 ">Popular Apps</h1>
        {
          isLoading?<div className='flex justify-center '><Image priority alt='logo' className='' width={300} height={300} src={logol} style={{ width: "auto", height: "auto" }}/></div>:
        
      <div className=' mx-auto max-w-[1400px] grid sm:grid-cols-2 md:grid-cols-3'>
        
        {
            apps.map((data)=>{
                return (
                    <div onClick={()=>openPage(data._id)} key={data.name} className='flex justify-between p-4 m-3 border rounded-lg items-center cursor-pointer'>
                        
                        <div className='flex items-center gap-5'>
                        <div className='w-14 h-14 bg-gray-200 rounded-md'>
                            
                        </div>
                                <div>
                                <h2 className='text-lg font-semibold'>{data.name}</h2>
                                <p className='text-sm'>{data.title}</p>
                                </div>    
                         
                        </div>
                        
                        <button>🤍{data.likes.length}</button>
                    </div>
                )
    
            })
        }
      </div>}
    </div>
    
  )
}

export default PopularApp
