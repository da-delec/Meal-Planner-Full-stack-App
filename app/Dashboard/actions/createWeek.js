"use server"
import prisma from "@/app/lib/prismaInstance"
import { revalidatePath } from "next/cache"

export async function createNewWeek(name, id) {
    try {
        console.log("Création d'une nouvelle semaine avec:", { name, id });
        
        if (!name || !id) {
            console.log("Paramètres manquants:", { name, id });
            return {
                success: false,
                error: "Le nom et l'ID sont requis"
            };
        }
        
        // Créer la nouvelle semaine
        const newWeek = await prisma.mealWeek.create({
            data: {
                name: name,
                startDate: new Date(), // ou une date spécifique
                endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
                
                userId: id,
                // Créer automatiquement les 7 jours de la semaine
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
        });

        revalidatePath("/Dashboard");
        return { success: true, data: newWeek };
    } catch (error) {
        console.error("Erreur lors de la création de la semaine:", error);
        return { 
            success: false, 
            error: "Une erreur est survenue lors de la création de la semaine" 
        };
    }
} 