import { auth } from '@/app/auth'
import prisma from '@/app/lib/prismaInstance'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const session = await auth()
        if (!session) {
            return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
        }

        const weeks = await prisma.mealWeek.findMany({
            where: {
                userId: session.user.id
            },
            include: {
                days: true
            }
        })

        return NextResponse.json(weeks)
    } catch (error) {
        console.error("Erreur lors de la récupération des semaines:", error)
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
    }
} 