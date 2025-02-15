'use client'
import React from 'react'
import { createNewWeek } from '../actions/createWeek'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const AddWeeksModal = ({session, isAddWeeksModalOpen, setIsAddWeeksModalOpen, onWeekAdded}) => {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const {id} = session.user
  const router = useRouter()
  const { update } = useSession()

  const handleSubmit = async (formData) => {
    try {
      const result = await createNewWeek(name, id)
      if (result.success) {
        onWeekAdded(result.data)
        await update()
        setIsAddWeeksModalOpen(false)
        setName('')
      } else {
        setError(result.error || "Erreur lors de la création de la semaine")
      }
    } catch (err) {
      setError("Une erreur est survenue")
      console.error(err)
    }
  }

  return (
    <div className='absolute h-screen w-screen flex justify-center items-center bg-slate-700/60'>
      <div className='bg-gray-700 h-[50%] w-[40%] flex flex-col items-center rounded-md'>
        <div className='w-full flex justify-end mt-2 mr-2' id='button-container'> 
          <button onClick={() => setIsAddWeeksModalOpen(false)} className='btn btn-circle btn-error'>Close</button>
        </div>
        <h1 className='text-white mt-6 text-2xl'>Add a Week</h1>
        <form action={handleSubmit} className='items-center flex my-4 w-[70%] flex-col gap-4'>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            name='name' 
            placeholder='Name' 
            className='input input-bordered w-full max-w-xs'
            required 
          />
          {error && <p className="text-red-500">{error}</p>}
          <button 
            type='submit' 
            className='btn my-4 w-[70%] btn-primary'
            disabled={!name}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddWeeksModal
