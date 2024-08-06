import React from 'react'

function Comment() {
  return (
    <div>
        <div className='mx-5  my-2 flex border-blue-500 border-2 p-4 rounded-lg'>
            
    <div className='w-14 h-12 mr-2 bg-pink-400 rounded-full'></div>
    <textarea className='border-none outline-none py-2 w-[100%] h-[120px]' placeholder='What do you think?'></textarea>
    
</div>
<div className='flex justify-end'>
     <button className='mr-5 px-5 py-3 bg-blue-500 text-white font-semibold text-lg rounded-lg'>Comment</button>  
</div>
</div>
  )
}

export default Comment