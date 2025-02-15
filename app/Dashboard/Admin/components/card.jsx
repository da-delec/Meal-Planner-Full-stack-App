import React from 'react'
import { deleteUser, getUsers, changeRole, toggleBlockUser } from '../actions'
import { useState } from 'react'

const Card = ({user, setUsers}) => {
    console.log(user)
    const [isModalOpen, setIsModalOpen] = useState(false);

    async function deleteUserHandler() {
        if(user.role !== 'ADMIN') {
            await deleteUser(user.id);
            const updatedUsers = await getUsers();
            setUsers(updatedUsers);
        }
    }

    async function handleRoleChange() {
        await changeRole(user.id);
        const updatedUsers = await getUsers();
        setUsers(updatedUsers);
    }

    async function handleBlockToggle() {
        await toggleBlockUser(user.id);
        const updatedUsers = await getUsers();
        setUsers(updatedUsers);
    }

    return (
        <div className='grid grid-cols-4 min-h-20 w-[90%] rounded-md bg-gray-900'>
            <div id='left-side' className=''>    
                <h1>UserName: {user.firstName} {user.lastName}</h1>
                <h1>Email: {user.email}</h1>
                <h1>Role: {user.role}</h1>
                <h1>Status: {user.isBlocked ? 'Blocked' : 'Active'}</h1>
            </div>
       
            <div id='delete-button' className='my-auto'>
                <button onClick={deleteUserHandler} className='bg-red-500 right-0 text-white p-2 rounded-md'>Delete User</button>
            </div>
            <div id='right-side' className=' flex flex-col items-center justify-center gap-2'>
                <button onClick={handleRoleChange} className='bg-blue-500 text-white p-2 rounded-md'>Change Role</button>
                <button 
                    onClick={handleBlockToggle} 
                    className={`${user.isBlocked ? 'bg-green-500' : 'bg-red-500'} text-white p-2 rounded-md`}
                >
                    {user.isBlocked ? 'Unblock User' : 'Block User'}
                </button>
            </div>
            <div id='user-photo' className='my-auto ml-3'>
                <img src={user.profileImage} alt='user-photo' className='w-12 h-12 rounded-full' />
            </div>
           
        </div>
    )
}

export default Card
