import prisma from '@/app/lib/prismaInstance'
import { NextResponse } from 'next/server'

export async function PUT(request) {
    try {
        const body = await request.json()
        const { name, email, image, userId } = body

        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                name,
                email,
                image
            }
        })

        return NextResponse.json(updatedUser)
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
} 