'use server'  // Cette ligne est importante !
import prisma from '@/app/lib/prismaInstance'

export async function updateUser(data) {
    try {
        console.log("this is the server data:", data)
        if (!data?.userId) {
            throw new Error('User ID is required')
        }

        // On crée un objet updateData qui ne contient que les champs remplis
        const updateData = {}
        if (data.name && data.name.trim() !== '') {
            // On sépare le nom en firstName et lastName
            const [firstName, ...lastNameParts] = data.name.trim().split(' ')
            updateData.firstName = firstName
            if (lastNameParts.length > 0) {
                updateData.lastName = lastNameParts.join(' ')
            }
        }
        if (data.email && data.email.trim() !== '') updateData.email = data.email
        if (data.image && data.image.trim() !== '') updateData.profileImage = data.image
        
        console.log('this is the update data:', updateData)
        
        try {
            const user = await prisma.user.update({
                where: {
                    id: data.userId
                },
                data: updateData,
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    profileImage: true
                }
            })
            
            console.log('Updated user:', user)
            return user
        } catch (prismaError) {
            console.error('Prisma error:')
            throw new Error('Database update failed')
        }
    } catch (error) {
        console.log('Update error:')
        throw new Error('Failed to update user')
    }
} 