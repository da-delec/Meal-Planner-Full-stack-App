import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/app/lib/prismaInstance";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error("Email et mot de passe requis");
                    }

                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email },
                        include: {
                            mealWeeks: {
                                include: {
                                    days: true
                                }
                            }
                        }
                    });

                    if (!user) {
                        throw new Error("Utilisateur non trouvé");
                    }

                    if (user.password !== credentials.password) {
                        throw new Error("Mot de passe incorrect");
                    }

                    const userWithData = {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        profileImage: user.profileImage,
                        role: user.role,
                        isBlocked: user.isBlocked,
                        mealWeeks: user.mealWeeks
                    };
                    
                    return userWithData;
                    
                } catch (error) {
                    throw new Error(error.message);
                }
            }
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (session?.user) {
                const updatedUser = await prisma.user.findUnique({
                    where: { id: token.sub },
                    include: {
                        mealWeeks: {
                            include: {
                                days: true
                            }
                        }
                    }
                });

                session.user.id = token.sub;
                session.user.firstName = token.firstName;
                session.user.lastName = token.lastName;
                session.user.profileImage = token.profileImage;
                session.user.role = token.role;
                session.user.isBlocked = token.isBlocked;
                session.user.mealWeeks = updatedUser.mealWeeks;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.profileImage = user.profileImage;
                token.role = user.role;
                token.isBlocked = user.isBlocked;
            }
            return token;
        }
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/LoginPage",
    },
});