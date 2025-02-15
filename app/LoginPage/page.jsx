"use client"
import React from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const page = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (res?.error) {
        setError(res.error)
      } else {
        setSuccess('Connexion réussie')
        router.push('/Dashboard')
      }
    } catch (error) {
      setError('Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='flex justify-center items-center h-screen bg-gray-950'>
      <div className='flex h-[70%] w-[40%] bg-gray-900 rounded-md flex-col items-center justify-center'>
        <h1 className= ' mb-5 text-white text-2xl font-bold text-center'>Connect to your Account </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <div className='flex flex-col items-center justify-center'>
          <form onSubmit={onSubmit} className='flex flex-col items-center justify-center'>
            <input 
              type='email' 
              placeholder='Email' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='my-4 bg-gray-700 text-white px-4 py-2 rounded-md'
            />
            <input 
              type='password' 
              placeholder='Password' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='my-4 bg-gray-700 text-white px-4 py-2 rounded-md'
            />
            <button 
              type='submit' 
              disabled={loading}
              className='my-4 bg-primary text-white px-4 py-2 rounded-md disabled:opacity-50'
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default page

