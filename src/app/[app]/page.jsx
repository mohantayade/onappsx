"use client"
import Comment from '@/components/Comment'
import axios from 'axios';
import React, { useState,useEffect } from 'react'
import {useQuery} from 'react-query';
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import tubeLoading from '@/assets/tube-spinner.svg'
import Image from 'next/image';
import LikeComponent from '@/components/LikeComponent';

function appPage() {
    const appId = usePathname()
    // const queryClient = useQueryClient(); 

    const fetchApps = async () => {
        const response = await axios.get(`/api/apps/details/${appId}`);
        return response.data.apps;
      }
      const { data: apps = [], isLoading ,refetch } = useQuery("apps", fetchApps);


      const [likeFetch, setlikeFetch] = useState(false);
      const handlelikeFetchChange = () => {
        setlikeFetch(!likeFetch);
      };

      useEffect(() => {
        // Refetch apps data when the message state changes
        refetch();
      }, [likeFetch, refetch]);

if (isLoading) {
    return(
        <div className=' max-w-[800px] mx-auto my-5'>
            <div className='flex justify-center items-center w-full h-[50vh]'>
            <Image alt='loading' src={tubeLoading} width={100} height={100} priority />
            </div>
          
        </div>
    )
}

  return (
    <div>

        

        <div className=' max-w-[800px] mx-auto my-5'>
            <div className='mx-5  md:flex md: md:justify-center md:flex-nowrap grid grid-cols-2  items-center gap-2'>
                <div className='w-16 h-16 flex items-center justify-center rounded-lg flex-shrink-0 order-1 md:order-1 '>
                  <Image src={apps[0]?.logo} className='' width={100} height={100}/></div>
                <div className='md:grow order-3 md:order-2 flex md:flex-col flex-row md:items-start justify-between bg-white col-span-2 md:pt-2'>
                    <h1 className='text-xl font-bold pl-1'>{apps[0]?.name}</h1> 
                    <div className='flex gap-2 mr-1'>
                        <p>❤️ {apps[0]?.likes.length}</p>
                    <p>💬 {apps[0]?.comments.length}</p></div>
                    </div>
                <div className='self-center shrink order-2 md:order-3 flex place-content-end  items-center gap-1 '>
                    
                <Link href={apps[0]?.link} target="_blank" className=' px-5 py-3 rounded-xl bg-blue-500 text-white text-center font-semibold '>Open</Link>
                <LikeComponent id={appId} onFetchChange={handlelikeFetchChange}/>
                </div>
            </div>
            <hr className='mt-2' />
            <div  className='mx-5  my-2 '>
                <h2 className='font-semibold text-gray-400 mb-2'>{apps[0]?.title}</h2>
                <p className='text-sm'>{apps[0]?.discription}</p>
            </div>

            <hr className='border-2 rounded-full' />
            {/* comment section */}

            <Comment appId={appId} />

    </div>
    </div>
  )
}

export default appPage