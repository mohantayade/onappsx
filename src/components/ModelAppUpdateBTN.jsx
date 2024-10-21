
import React, { useEffect, useState } from 'react'
import MyModel from './MyModel'
import axios from 'axios'
function ModelAppUpdate({appUpdateId}) {

    const initialAppState = {
        _id: appUpdateId,
        name:"",
        title:"",
        link:"",
        discription:""
    }

    const [app,setApp]= useState(initialAppState)

   const [showModel, setShowModel]=useState(false)
   const closeModel = ()=> setShowModel(false)
   const [appUpdate,setAppUpdate]= useState("")
const[updateLoading,setUpdateLoading]= useState(false)
   
//    const mainfunction = ()=>{
//     closeModel();
//     modelFunction()
//    }


  const inputChangeH = (e) => {
        const { name, value } = e.target;
        setApp({ ...app, [name]: value });
    };

   useEffect(()=>{
    const token = localStorage.getItem('token')
      
     axios.get('/api/user/userapp',{
      params: {
        token: token,
        appId : appUpdateId }
    }).then((responce)=>{
        setApp(responce.data.app)
        
    }).catch((error)=>{console.log("eroor",error.response)})
    return ()=>setAppUpdate("")
  },[showModel])


  const updateAppFun =()=>{
    setUpdateLoading(true)
    const token = localStorage.getItem('token')
      
     axios.patch('/api/user/userapp',app,{
      params: {
        token: token
     }
    }).then((responce)=>{
        setAppUpdate(responce.data.message)
        setUpdateLoading(false)
    }).catch((error)=>{
        console.log("eroor",error.response);
        setUpdateLoading(false)
    })
  }



   const mainModel = (
    <MyModel closeModel={closeModel} >
        <div className=''>

        <div className="flex  flex-col text-black w-[250px] md:w-[300px] ">

            <p className='text-center py-3 mx-2 md:mx-10 text-xl'>Edit Your App Details</p>

            <div>
                        <label className='pl-1 text-sm'>Name :</label>
                        <input
                            type="text"
                            name='name'
                            value={app.name}
                            onChange={inputChangeH}
                            placeholder='Name'
                            className='border text-lg p-2 rounded-lg w-full my-1'
                        />
                        <label className='pl-1 text-sm'>Title :</label>
                        <input
                            type="text"
                            name='title'
                            value={app.title}
                            onChange={inputChangeH}
                            placeholder='Title'
                            className='border text-lg p-2 rounded-lg w-full my-1'
                        />
                        <label className='pl-1 text-sm'>Link :</label>
                        <input
                            type="text"
                            name='link'
                            value={app.link}
                            onChange={inputChangeH}
                            placeholder='Link'
                            className='border text-lg p-2 rounded-lg w-full my-1'
                        />
{/* logo update section todo */}
                        <label className='pl-1 text-sm'>Logo Update:</label>
                        <input
                            type="file"
                            onChange={inputChangeH}
                            placeholder='Logo'
                            className='border text-lg p-2 rounded-lg w-full my-1'
                        />

                        <label className='pl-1 text-sm'>Description :</label>
                        <textarea
                            name='discription'
                            value={app.discription}
                            onChange={inputChangeH}
                            placeholder='Description'
                            className='border text-lg p-2 rounded-lg w-full my-1'
                        />
                    </div>
                    <p className='text-center font-bold text-red-500 p-2'>{appUpdate}</p>
            <div className='flex gap-2 '>
            <button onClick={updateAppFun} className='text-lg font-bold p-3  rounded-lg text-white grow bg-red-500 hover:bg-red-800'>{updateLoading?"sending..":"Update"}</button>
            <button className='text-lg font-bold p-3 bg-blue-500 rounded-lg text-white grow hover:bg-blue-800' onClick={closeModel}>Cancel</button>
            </div>
            
            </div>
        </div>
    </MyModel>
   );
    

  return (
    <div>
      <button 
          onClick={()=> setShowModel(true)}
          className='bg-blue-500 text-white  font-semibold  hover:bg-blue-800 rounded-lg h-12  px-4 max-w-[180px] mx-2'>Edit ✏️</button>
      {showModel && mainModel}
    </div>
  )
}

export default ModelAppUpdate
