"use server"
import prisma from "@/app/lib/prismaInstance"
import { revalidatePath } from "next/cache"

export async function createWeeks(Name, session) {
    try {
        // Créer une date de début (aujourd'hui)
        const startDate = new Date()
        // Créer une date de fin (7 jours après)
        const endDate = new Date(startDate)
        endDate.setDate(endDate.getDate() + 7)

        const newWeeks = await prisma.MealWeek.create({
            data: {
                name: Name,
                startDate: startDate,
                endDate: endDate,
                userId: session.user.id,
                days: {
                    create: [
                        { dayOfWeek: 'MONDAY' },
                        { dayOfWeek: 'TUESDAY' },
                        { dayOfWeek: 'WEDNESDAY' },
                        { dayOfWeek: 'THURSDAY' },
                        { dayOfWeek: 'FRIDAY' },
                        { dayOfWeek: 'SATURDAY' },
                        { dayOfWeek: 'SUNDAY' }
                    ]
                }
            }
        })

        revalidatePath("/Dashboard")
        return { success: true, data: newWeeks }

    } catch (error) {
        console.error("Erreur lors de la création de la semaine:", error)
        return { 
            success: false, 
            error: "Une erreur est survenue lors de la création de la semaine" 
        }
    }
}