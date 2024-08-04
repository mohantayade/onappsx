import React, { useState } from 'react'
import MyModel from './MyModel'
function Model({modelFunction}) {

    const [showModel, setShowModel]=useState(false)

   const closeModel = ()=> setShowModel(false)
   
   const mainfunction = ()=>{
    closeModel();
    modelFunction()
   }

   const mainModel = (
    <MyModel closeModel={closeModel} mainfunction={mainfunction} >
        <div className=''>

        <div className="flex  flex-col text-black w-[250px] md:w-[300px] ">
            <p className='text-center py-3 mx-2 md:mx-10 text-xl'>Are You Sure ?</p>
            <div className='flex gap-2 '>
            <button className='text-lg font-bold p-3  rounded-lg text-white grow bg-red-500 hover:bg-red-800' onClick={mainfunction}>Yes</button>
            <button className='text-lg font-bold p-3 bg-blue-500 rounded-lg text-white grow hover:bg-blue-800' onClick={closeModel}>NO</button>
            </div>
            
            </div>
        </div>
    </MyModel>
   );
    

  return (
    <div>
      <button 
          onClick={()=> setShowModel(true)}
          className='bg-red-500 text-white  font-semibold  hover:bg-red-800 rounded-lg h-12  px-4 max-w-[180px] mx-2'>Delete 🚮</button>
      {showModel && mainModel}
    </div>
  )
}

export default Model
