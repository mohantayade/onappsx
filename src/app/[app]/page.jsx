"use client"
import Comment from '@/components/Comment'
import axios from 'axios';
import React from 'react'
import {useQuery} from 'react-query';
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import tubeLoading from '@/assets/tube-spinner.svg'
function appPage() {
    const appId = usePathname()
    const fetchApps = async () => {
        const response = await axios.get(`/api/apps/details/${appId}`);
        return response.data.apps;
      }
      const { data: apps = [], isLoading } = useQuery("apps", fetchApps);
 

if (isLoading) {
    return(
        <div className=' max-w-[800px] mx-auto my-5'>
           <Image src={tubeLoading} width={100} height={100} />
        </div>
    )
}

  return (
    <div>
        
        <div className=' max-w-[800px] mx-auto my-5'>
            <div className='mx-5  md:flex md: md:justify-center md:flex-nowrap grid grid-cols-2  items-center gap-2'>
                <div className='w-16 h-16 rounded-lg bg-black flex-shrink-0 order-1 md:order-1'>logo</div>
                <div className='md:grow order-3 md:order-2 flex md:flex-col flex-row md:items-start justify-between bg-white col-span-2 md:pt-2'>
                    <h1 className='text-xl font-bold pl-1'>{apps[0]?.name}</h1> 
                    <div className='flex gap-2 mr-1'>
                        <p>❤️ {apps[0]?.likes.length}</p>
                    <p>💬 {apps[0]?.comments.length}</p></div>
                    </div>
                <div className='self-center shrink order-2 md:order-3 flex place-content-end  items-center gap-1 '>
                    
                <Link href={apps[0]?.link} target="_blank" className=' px-5 py-3 rounded-xl bg-blue-500 text-white text-center font-semibold '>Open</Link>
                <button className=' px-5 py-2 rounded-xl font-semibold border-2 border-blue-500  text-2xl'>🤍</button>
                </div>
            </div>
            <hr className='mt-2' />
            <div  className='mx-5  my-2 '>
                <h2 className='font-semibold text-gray-400 mb-2'>{apps[0]?.title}</h2>
                <p className='text-sm'>{apps[0]?.discription}</p>
            </div>

            <hr className='border-2 rounded-full' />
            {/* comment section */}

            <Comment/>

    </div>
    </div>
  )
}

export default appPage