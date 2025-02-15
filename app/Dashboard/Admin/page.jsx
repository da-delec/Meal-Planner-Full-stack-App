"use client"

import { useSession } from 'next-auth/react'
import { getUsers } from './actions'
import { useState } from 'react'
import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Card from './components/card'

const page = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const fetchedUsers = await getUsers();
        console.log("this is the users:", fetchedUsers);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Assurez-vous qu'il n'y a pas de dépendances inutiles ici

  if (loading) {
    return <div className="text-white">Chargement...</div>;
  }

  return (
    <div className='min-h-screen w-full bg-gray-950'>
      <Navbar session={session} />
      <div className='container mx-auto px-4 py-8'>
        <div className="flex justify-between items-center mb-8">
          <h1 className='text-white text-3xl font-bold'>Admin Dashboard</h1>
          <h1 className='text-white text-2xl font-bold'>Number of users: {users.length}</h1>
        </div>
        
        <div 
          id='users-container' 
          className='max-w-4xl mx-auto h-[calc(100vh-250px)] overflow-y-auto 
                     scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900
                     flex flex-col gap-4 p-4'
        >
          {users.map((user) => (
            <Card key={user.id} user={user} setUsers={setUsers} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default page
