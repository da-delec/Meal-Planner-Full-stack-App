import React from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@/app/auth'
import DashboardClient from './components/DashboardClient'

async function getData() {
    const session = await auth()
    if (!session) {
        redirect('/LoginPage')
    }
    return session
}

export default async function Page() {
    const session = await getData()
    return <DashboardClient session={session} />
}

