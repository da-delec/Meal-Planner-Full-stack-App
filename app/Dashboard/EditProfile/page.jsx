'use client'
import React from 'react'
import { updateUser } from './actions'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { revalidatePath } from 'next/cache'

const page = () => {
    const { data: session, status, update } = useSession()
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [image, setImage] = useState("")

    // Rediriger si non authentifié
    if (status === 'unauthenticated') {
        router.push('/SignIn')
        return null
    }

    async function onSubmit(e) {
        e.preventDefault()
        try {
            if (!session?.user?.id) {
                throw new Error('User not authenticated')
            }

            console.log('Session data:', session)
            console.log("this is the data user:", name, image)
            
            const userData = {
                name,
                email,
                image,
                userId: session.user.id
            }
            
            console.log("Sending data:", userData)
            const updatedUser = await updateUser(userData)
            
            // Mettre à jour la session avec les nouvelles données
            await update({
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                profileImage: updatedUser.profileImage
            })
            
            router.push('/Dashboard')
        
        } catch (error) {
            console.error('Failed to update profile:', error)
        }
    }
   
  return (
    <div className=' h-screen w-screen bg-gray-950 flex items-center justify-center'>
      <div className=' flex-col h-2/3 w-1/2 bg-gray-800 rounded-lg flex items-center justify-center'>
       <h1 className=' text-white text-2xl font-bold'>Edit your Porfile:</h1>
       <form onSubmit={onSubmit} className=' flex-col flex w-full items-center justify-center'>
        <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder='Name' className=' w-1/2 h-10 rounded-lg my-3 bg-gray-700 text-white p-2' />
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder='Email' className=' w-1/2 h-10 rounded-lg my-3   bg-gray-700 text-white p-2' />
        <input value={image} onChange={(e)=>setImage(e.target.value)} type="text" placeholder='Image URL' className=' w-1/2 my-3 h-10 rounded-lg bg-gray-700 text-white p-2' />
        <button type='submit' className=' btn my-4 btn-primary'>Save</button>
       </form>
       <button className=' btn btn-primary'>
        <Link href={'/Dashboard'}>
        Dashboard</Link></button>
      
      </div>
    </div>
  )
}

export default page
