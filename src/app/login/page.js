"use client"
import axios from "axios"
import Image from "next/image";
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import tubeLoading from '@/assets/tube-spinner.svg'

function page() {
    const router = useRouter()
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

    useEffect(() => {
        handleSubmit
        const token = localStorage.getItem('token')
        if (token) {
            router.push("/user")
        }
    })

    const handleSubmit = async () => {
        
        const data = { email, password };
        setUserLoading(true)
        if (data) {
            await axios.post('/api/user/login', data)
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
        <div className="">
           
            <div className="flex justify-center items-center h-full mx-1">
                <div className="   w-[380px] my-16 rounded-lg ">
                    <h1 className="text-center text-2xl font-bold m-4">Log In</h1>

                    <hr className="mx-10" />

                    <div className="m-5 grid gap-4  py-5">
                        <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" className="border-2 p-2 rounded-md  w-full" placeholder="Email" />
                        <div className="flex justify-between gap-2">
                            <input onChange={(e) => setPassword(e.target.value)} type={eye} className="border-2 p-2 rounded-md w-full" placeholder="Password" />
                            <button onClick={passView} className="bg-blue-500 py-3  text-white font-bold rounded-lg w-20">{eyeBtn}</button>
                        </div>
                        <p className="text-red-700">{err}</p>
                        {userLoading?<button className=" py-3 text-black font-bold rounded-lg flex justify-center"><Image src={tubeLoading} width={30} height={30}/></button>:<button onClick={handleSubmit} className="bg-blue-500 py-3 text-white font-bold rounded-lg">Log In</button>}
                    </div>

                    <div className="text-center">
                        <Link className="" href="/signup">Dont't have an account? <span className="text-blue-500">Signup</span></Link>
                    </div>

                    

                </div>
            </div>
        </div>
    )
}

export default page
