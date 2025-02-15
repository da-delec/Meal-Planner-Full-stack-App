'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Loader from '../_globalComponent/Loader'
import React from 'react'
import axios from 'axios'
import { useState } from 'react'

const page = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    async function onSubmit(e){
        e.preventDefault();
        try{
            const response = await axios.post("/api/Register", {email, password})
            setSuccess(response.data.message);
            setLoading(true);
            setTimeout(() => {
                router.push('/Dashboard');
            }, 1500);
        }catch(error){
            setError(error.response.data.error);
        }
    }
  return (
    <div className=' h-screen w-screen bg-gray-950 flex justify-center items-center'>
      {loading && <Loader />}
      <div className=' h-[60%] w-[40%] bg-gray-800 rounded-md'>
        <h1 className=' text-white text-center text-2xl'>Sign In</h1>
        <form onSubmit={onSubmit} className=' w-[90%] mx-auto mt-10 flex flex-col gap-4'>
          <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Email' className=' bg-gray-700 text-white px-4 py-2 rounded-md' />
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Password' className=' bg-gray-700 text-white px-4 py-2 rounded-md' />
          {error && <p className=' text-red-500'>{error}</p>}
          {success && <p className=' text-green-500'>{success}</p>}
          <button type='submit' className=' mt-10 bg-primary text-white px-4 py-2 rounded-md'>Sign In</button>
          <h1>Do you have an Account ? <Link href={"/LoginPage"} className=' text-primary'>Login</Link></h1>
        </form>
      </div>
    </div>
  )
}

export default page
