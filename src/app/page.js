"use client"
import PopularApp from '@/components/PopularApp';
import Search from '@/components/Search';
import '@/styles/home.css'



export default function Home() {
  return (
    <div className=' mt-5'>
      <div className='my-32'>
      <h1 className='text-center text-6xl mt-10 mb-2 font-extrabold'>On<span className='text-blue-500'>App</span>X</h1>
      <p className='text-center '>find your desired app in Web 🌐</p>
      <Search/>
      </div>
      
      <PopularApp/>
      
    
    
    </div>
  );
}
