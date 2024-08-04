"use client"

import LoginContext from "@/context/loginContext";
import axios from "axios";
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from "react";

function Navbar() {
  const router = useRouter()
  const [navButton, setNavButton] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const { setUser } = useContext(LoginContext)
  const {user} = useContext(LoginContext)
  
 
   const dropToggle =()=>{
    setDropdown(!dropdown)
    
   }



  const toggleButton = () => {
    setNavButton(!navButton);
  };

  const closeMenu = () => {
    setNavButton(false);
  };
  
  const logout = () => {
    localStorage.removeItem('token')
    setDropdown(false)
    setNavButton(!navButton)
    setUser("")
    router.push("/")
  }

  useEffect(() => {
  if (!user) {
    const token = localStorage.getItem('token')
    if (token) {
      axios.get("/api/user/profile", {
        params: {
          token: token }
      }).then((responce) => {
        const user = responce.data.message
        setUser(user)
       
      }).catch((error) => {
        console.log(error);
      })
    }
  }
  })

  
  const navlinks = [
    {
      link: "/",
      name: "Home"
    },
    {
      link: "/user",
      name: "Profile"
    },
    {
      link: "/all-apps",
      name: "All Apps"
    },
    {
      link: "/about",
      name: "About"
    },
    {
      link: "/contact",
      name: "Contact"
    }
  ];

  return (
    <div  className=" top-0 z-10 sticky bg-white shadow-lg">
      <div className="mx-auto h-10 px-5 flex justify-between items-center max-w-[1400px] py-8 ">
        <div onClick={()=>setDropdown(false)} className="text-center flex items-center gap-3">
          <svg width="30" height="30" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_235_973)"> <path fillRule="evenodd" clipRule="evenodd" d="M100 -4.37114e-06C155.228 -6.78525e-06 200 44.7715 200 100C200 155.228 155.228 200 100 200C44.7715 200 5.67237e-06 155.228 3.25826e-06 100C8.44143e-07 44.7715 44.7715 -1.95703e-06 100 -4.37114e-06ZM100 -4.37114e-06C138.108 -6.03688e-06 169 30.8923 169 69C169 107.108 138.108 138 100 138C61.8924 138 31 107.108 31 69C31 30.8923 61.8924 -2.7054e-06 100 -4.37114e-06ZM132 69C132 51.3269 117.673 37 100 37C82.3269 37 68 51.3269 68 69C68 86.6731 82.3269 101 100 101C117.673 101 132 86.6731 132 69Z" fill="url(#paint0_linear_235_973)" /> </g> <defs> <linearGradient id="paint0_linear_235_973" x1="-9.344e-06" y1="23" x2="152.5" y2="160.5" gradientUnits="userSpaceOnUse"> <stop stopColor="#0000FF" /> <stop offset="1" stopColor="#E7E9FF" /> </linearGradient> <clipPath id="clip0_235_973"> <rect width="200" height="200" fill="white" transform="translate(7.62939e-06 200) rotate(-90)" /> </clipPath> </defs> </svg>
          <Link className="text-2xl font-bold" href='/'>OnAppX</Link>
        </div>

        <div onClick={()=>setDropdown(false)} className="hidden md:flex gap-5 font-bold">
          {
            navlinks.map((nav) => (
              <Link key={nav.link} href={nav.link}>{nav.name}</Link>
            ))
          }
        </div>

        <div className="flex gap-2 items-center">
     {
      user?<div className="hidden md:block">
         <button className="shadow-lg py-2 px-4 rounded-full border  flex items-center gap-2 text-lg " onClick={dropToggle}>{user.name}
          <div className={dropdown?"transform rotate-0 transition-all":" transform rotate-180 transition-all"}>
            <svg className="hs-dropdown-open:rotate-180 size-4"  width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </div>
         </button>
          <div className={dropdown?"absolute mt-1 p-2 rounded-lg border shadow-lg bg-white  flex-col gap-2 flex":"hidden"}>
          <button className="hover:bg-gray-300 rounded-lg  px-3 py-1" onClick={logout}>logout</button>
          
          <Link onClick={dropToggle} href='/user' className="hover:bg-gray-300 rounded-lg  px-3 py-1" >Profile</Link>
          </div> 
         </div>
         :
         <><Link href='/login' className="hidden  md:block font-semibold ">Log In</Link>
<Link className="hidden md:block bg-blue-500 font-semibold text-white px-4 py-2 rounded-lg" href='/signup'>Sign Up</Link></>
     }



          <button className="md:hidden" onClick={toggleButton}>{navButton ? <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" >
            <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#0F0F0F" />
          </svg> : <svg width="30px" height="30px" viewBox="0 0 20 20" fill="none">
            <path fill="#000000" fillRule="evenodd" d="M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z" />
          </svg>}</button>
        </div>
      </div>

      {/* mobile nav menu */}
      {
        navButton && (
          <div className="md:hidden grid gap-5 absolute w-full top-16 font-bold bg-white shadow-lg py-5 z-10">
            {
              navlinks.map((nav) => (
                <Link key={nav.link} className="text-center" href={nav.link} onClick={closeMenu}>{nav.name}</Link>
              ))
            }
            {
              user?<div className="mx-auto">{user.name} <button className="hover:bg-gray-300 rounded-lg  px-3 py-1" onClick={logout}>logout</button></div>:<div className="flex justify-center items-center gap-4">

              <Link onClick={closeMenu} href='/login' className="font-semibold">Log In</Link>
              <Link onClick={closeMenu} className="bg-blue-500 font-semibold text-white px-4 py-2 rounded-lg" href='/signup'>Sign Up</Link>
            </div>
            }
            

          </div>
        )
      }
    </div>
  );
}

export default Navbar;
