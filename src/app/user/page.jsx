"use client"
import axios from 'axios'
import React, { useEffect, useState,useContext } from 'react'
import { useRouter } from 'next/navigation'
import LoginContext from '@/context/loginContext'
import tubeLoading from '@/assets/tube-spinner.svg'
import Image from 'next/image'
import ModelDeleteBTN from '@/components/ModelDeleteBTN'
import ModelAppUpdate from '@/components/ModelAppUpdateBTN'


function User() {

 
  // state section
  const router = useRouter()
  const [userLoading,setUserLoading] = useState(false)
  const [appLoading,setAppLoading] = useState(false)

  const [userData, setUserData] = useState("")
  const { setUser } = useContext(LoginContext)
  const [count,setCount]=useState(1)
  const handleReload=()=>{
    setCount(count+1)
   
  }
  // create app state
  const [name,setName]= useState("")
  const [title,setTitle]= useState("")
  const [discription,setDiscription]= useState("")
  const [link,setLink]= useState("")
  
  // const [logo,setLogo]= useState()
  const [appResponce,setAppResponce]= useState("")

  const [userApps,setUserApps]= useState([])

  const [deleteRes,setDeleteRes]=useState("")


  const submitApp = async() =>{
    const token = localStorage.getItem('token')

    const data ={
      name:name,
      title:title,
      link:link,
      discription:discription
    }
      
     await axios.post('/api/user/createapp',data,{
        params: {
          token: token }
      })
      .then((responce)=>{setAppResponce(responce.data.message)
        setTimeout(() => {
          setAppResponce("")
        }, 1500);
      })
      .catch((error)=>{setAppResponce(error.response.data.message); setTimeout(() => {
        setAppResponce("")
      }, 1500);})

  }

  useEffect(()=>{
    setAppLoading(true)
    const token = localStorage.getItem('token')
      
     axios.get('/api/user/userapp',{
      params: {
        token: token }
    })
      .then((responce)=>{
        setUserApps(responce.data.apps)
        setAppLoading(false)})
      .catch((error)=>{console.log(error.response.data.message);
        setAppLoading(false)
      })

  },[deleteRes,count])


  
//  user data get

  useEffect(() => {
    setUserLoading(true)
    const token = localStorage.getItem('token')
    if (token) {
      axios.get("/api/user/profile", {
        params: {
          token: token }
      }).then((responce) => {
        setUserLoading(true)
        setUserData(responce.data.message)
        setUser(responce.data.message)
        setUserLoading(false)
       
      }).catch((error) => {
        console.log(error.response.statusText);
        setUserLoading(false)
        if (error.response.status === 402) {
          router.push('/login');
          setUserLoading(false)
        }
      });
    } else {
      setUserLoading(false)
      router.push('/login');
    }
  }, []);

  
  const logout = () => {
    localStorage.removeItem('token')
    setUser("")
    router.push("/")
  }

  // delete apps

  const deleteApp = async(id)=>{
   
    const token = localStorage.getItem('token')

      const data = {appId:id}
      
      await axios.delete('/api/user/userapp',{
        data:data,
       params: {
         token: token }
     })
       .then((responce)=>{
        setDeleteRes(responce.data.message)
        
        setTimeout(() => {
          setDeleteRes("")
        }, 1000);
      })
       .catch((error)=>{console.log(error.response.data.message)})
    }



  return (
    <>
    
    <div className='mx-3 '>


        {/* user profile */}

      {
        userLoading? <div className='flex flex-col justify-center items-center bg-white mx-auto max-w-[1000px] shadow-lg border rounded-lg my-10 h-[30vh]'><Image src={tubeLoading} width={100} height={100} /></div>:<div className='flex flex-col justify-center items-center bg-white mx-auto max-w-[1000px] shadow-lg border rounded-lg my-10 '>
        <div className='flex flex-col justify-center items-center  '>
          <div className=' bg-gray-400 w-20 h-20 rounded-full my-4'>
            </div>
            <p>{userData.name}</p>
            </div>
        <h1 className='text-2xl font-bold text-center mt-5'></h1>
        <hr className='mx-5' />
        <div className=''>
          <h1 className='text-xl font-semibold text-center text-blue-500 '>Email</h1>
          <h1 className='text-lg  text-center  '>{userData.email}</h1>
        </div>
      <button onClick={logout} className='bg-blue-500 text-white text-xl font-semibold  hover:bg-blue-800 rounded-lg mx-auto mb-4 h-12 mt-4 px-10 max-w-[200px]'>Logout</button>
      </div>
      }
          

      
        {/* create app section */}
        <div className=''>
          <div className=' grid grid-rows-1 md:grid-cols-2 max-w-[1000px] mx-auto mb-10 rounded-lg shadow-lg bg-white h-auto px-2'>
      <div className=' max-w-[400px] mx-auto'>
              <label>Create App data :</label>
          <input onChange={(e)=>setName(e.target.value)}
          className='border text-lg p-2 rounded-lg w-full my-1' type="text" placeholder='name' />
          <input onChange={(e)=>setTitle(e.target.value)}
          className='border text-lg p-2 rounded-lg w-full my-1' type="text" placeholder='title' />
          <input onChange={(e)=>setLink(e.target.value)}
          className='border text-lg p-2 rounded-lg w-full my-1' type="text" placeholder='Link' />
      </div>
          <textarea onChange={(e)=>setDiscription(e.target.value)}
          className='border text-lg p-2 rounded-lg w-full  mx-auto' type="text" placeholder='discription' />
          <p className='text-center font-semibold text-red-500 md:col-span-2 p-4'>{appResponce}</p>
          <button disabled={name==""|title==""|link==""} onClick={submitApp} className='bg-blue-500 text-white text-xl  font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-800 rounded-lg mx-auto mb-4 h-12 mt-4 px-10 max-w-[200px] md:col-span-2 '>Submit</button>
          
          </div>
          
        </div>


   {/* Your apps sections */}
        <div>
        <div className=' grid grid-rows-1  max-w-[1000px] mx-auto mb-10 rounded-lg shadow-lg bg-white h-auto'>
        <label className='text-xl text-blue-400 font-bold m-5 flex justify-between'>Your Apps 
          <button className="text-black text-sm" onClick={handleReload}>↻ Refresh</button></label>
        
        
        <label className='text-red-500 font-bold text-xl text-center'>{deleteRes}</label>
        {
  appLoading?<div className='px-2 py-2 flex justify-center'><Image src={tubeLoading} width={100} height={100} /></div>:<div className='px-2 py-2'>
  {
    userApps.map((data)=>{
      return <div key={data._id} className='md:flex justify-between mx-auto p-2  border rounded-lg items-center w-full mb-2 '>          
      <div className='flex items-center gap-4'>
      <div className='w-14 h-14 bg-gray-200 rounded-md'> 
      </div>
              <div>
              <h2 className='text-lg font-semibold text-wrap'>{data.name}</h2>
              <p className='text-sm text-wrap'>{data.title}</p>
              </div> 
      </div>
      <div className='flex justify-between gap-3 mt-3 md:mt-0'>
      
      <ModelDeleteBTN modelFunction={() => deleteApp(data._id)} />
      <ModelAppUpdate appUpdateId={data._id} />
      </div>
      
  </div>
    })
  }
  



                      
    </div>
}
          


      </div>
        </div>


    </div>

    </>
  )
}

export default User
