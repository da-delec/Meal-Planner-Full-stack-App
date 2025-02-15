const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function deleteAll() {
    try {
        // Supprimer d'abord les jours
        await prisma.mealDay.deleteMany()
        console.log('✅ Tous les jours ont été supprimés')

        // Puis les semaines
        await prisma.mealWeek.deleteMany()
        console.log('✅ Toutes les semaines ont été supprimées')

    } catch (error) {
        console.error('Erreur:', error)
    } finally {
        await prisma.$disconnect()
    }
}

deleteAll() 