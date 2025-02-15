'use client'
import React, { useState } from 'react'
import SideBar from './SideBar'
import Navbar from './Navbar'
import MainSection from './mainSection'

const DashboardClient = ({session}) => {
    const [selectedWeekId, setSelectedWeekId] = useState(null)

    return (
        <div className='h-screen w-screen bg-gray-950 flex flex-col overflow-hidden'>
            <Navbar session={session} />
            <div className='flex flex-1 overflow-hidden'>
                <SideBar 
                    session={session} 
                    onWeekSelect={setSelectedWeekId}
                />
                <MainSection 
                    session={session} 
                    selectedWeekId={selectedWeekId}
                />
            </div>
        </div>
    )
}

export default DashboardClient 