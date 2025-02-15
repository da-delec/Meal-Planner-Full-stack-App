'use server'

import prisma from "@/app/lib/prismaInstance"
import { revalidatePath } from "next/cache"

export async function deleteWeek(weekId) {
    try {
        // Supprimer d'abord tous les jours associés à la semaine
        await prisma.mealDay.deleteMany({
            where: {
                weekId: weekId
            }
        })

        // Puis supprimer la semaine
        await prisma.mealWeek.delete({
            where: {
                id: weekId
            }
        })

        revalidatePath("/Dashboard")
        return { success: true }
    } catch (error) {
        console.error("Erreur lors de la suppression de la semaine:", error)
        return { 
            success: false, 
            error: "Une erreur est survenue lors de la suppression de la semaine" 
        }
    }
} 