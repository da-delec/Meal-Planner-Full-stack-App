"use server"
import prisma from "@/app/lib/prismaInstance"
import { revalidatePath } from "next/cache"

export async function getUsers() {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            profileImage: true,
            role: true
            // On retirera le commentaire après la migration
            // isBlocked: true
        }
    });
    return users;
}

export async function deleteUser(id) {
    const user = await prisma.user.delete({
        where: { id }
    });
    revalidatePath("/Dashboard/Admin");
    return user;
}

export async function changeRole(id) {
    // D'abord on récupère l'utilisateur actuel pour connaître son rôle
    const currentUser = await prisma.user.findUnique({
        where: { id }
    });

    // Ensuite on change son rôle
    const user = await prisma.user.update({
        where: { id },
        data: {
            role: currentUser.role === 'ADMIN' ? 'USER' : 'ADMIN'
        }
    });
    console.log("log after ",user)
    revalidatePath("/Dashboard/Admin");
    return user;
}

export async function updateUser(userId, data) {
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: data,
        include: {
            role: true
        }
    });
    revalidatePath("/Dashboard/Admin");
    return updatedUser;
}

export async function toggleBlockUser(id) {
    // D'abord on récupère l'utilisateur actuel
    const currentUser = await prisma.user.findUnique({
        where: { id }
    });

    // On inverse son état de blocage
    const user = await prisma.user.update({
        where: { id },
        data: {
            isBlocked: !currentUser.isBlocked
        }
    });
    revalidatePath("/Dashboard/Admin");
    return user;
}