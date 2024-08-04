"use client"
import Link from "next/link";
import axios from "axios"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import tubeLoading from '@/assets/tube-spinner.svg'
import Image from "next/image";

function page() {
  const router = useRouter()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eye, setEye] = useState("password");
  const [eyeBtn, setEyebtn] = useState("Show");
  const [err, setErr] = useState("");
  const [userLoading,setUserLoading] = useState(false)
  

  const passView = () => {
    if (eye == "password") {
      setEye("text")
      setEyebtn("Hide")
    } else {
      setEye("password");
      setEyebtn("Show")
    }
  }


  console.log(eye);

  useEffect(() => {
    handleSubmit
    const token = localStorage.getItem('token')
  if (token) {
      router.push("/user")
  }
  })

  const handleSubmit = async () => {
    setUserLoading(true)
    const data = { name, email, password };
    
    if (data) {
      await axios.post('/api/user/signup', data)
        .then(function (response) {
          const bearerToken = response.headers.authorization;

          const token = bearerToken.split("Bearer ")[1]

          localStorage.setItem("token", token)


          router.push("/user")
          setUserLoading(false)
        })
        .catch(function (error) {
          setErr(error.response.data.message)
          console.log(error.response ? error.response.data.message : error.message);
          setUserLoading(false)
        });
    }

  }

  return (
    <>
      <div className="flex justify-center items-center h-full">
        <div className=" my-10  ">
          <h1 className="text-center text-2xl font-bold m-4">Sign Up Form</h1>

          <hr className="mx-10" />
          <div className="grid gap-4 px-5 py-5">

            <input onChange={(e) => setName(e.target.value)} type="text" className="border-2 p-2 rounded-md w-full" placeholder="Name" />
            <input onChange={(e) => setEmail(e.target.value)} type="email" className="border-2 p-2 rounded-md w-full" placeholder="Email" />

            <div className="flex justify-between gap-2">
              <input onChange={(e) => setPassword(e.target.value)} type={eye} className="border-2 p-2 rounded-md w-full" placeholder="Password" />
              <button onClick={passView} className="bg-blue-500 py-3 w-20 text-white font-bold rounded-lg">{eyeBtn}</button>
            </div>


            <p className="text-red-700">{err}</p>
            {userLoading?<button className=" py-3 text-black font-bold rounded-lg flex justify-center"><Image src={tubeLoading} width={30} height={30}/></button>:<button onClick={handleSubmit} className="bg-blue-500 py-3 text-white font-bold rounded-lg">Sign Up</button>}
            <div className="text-center">
              <Link className="" href="/login">Already have an account? <span className="text-blue-500">LogIn</span></Link>
            </div>
          </div >


          {/* <div className="relative flex items-center mx-5 mb-5">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>


          <div className="flex justify-center items-center mx-5 ">
            <Link href="/" className="px-5 py-2 border-2 rounded-lg flex items-center ">
              <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="" width={30} />
              <div className="text-center w-full">
                <span className="mx-10 font-bold text-gray-600 text-sm">LogIn With Google</span>
              </div></Link>
          </div> */}



        </div>
      </div>
    </>
  )
}

export default page