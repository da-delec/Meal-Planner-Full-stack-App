'use server'

import prisma from "@/app/lib/prismaInstance"
import { revalidatePath } from "next/cache"

export async function updateMeals(dayId, meals) {
    try {
        const updatedDay = await prisma.mealDay.update({
            where: {
                id: dayId
            },
            data: {
                breakfast: meals.breakfast,
                lunch: meals.lunch,
                dinner: meals.dinner
            }
        });

        revalidatePath("/Dashboard");
        return { success: true, data: updatedDay };
    } catch (error) {
        console.error("Erreur lors de la mise à jour des repas:", error);
        return { 
            success: false, 
            error: "Une erreur est survenue lors de la mise à jour des repas" 
        };
    }
} 