import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismaInstance";
export async function POST(req){
   try {
    const {email, password} = await req.json();

   if(!email || !password){
    return NextResponse.json({error: "Email and password are required"}, {status: 400});
   }

   const user = await prisma.user.findUnique({
    where: {email}
   })

   if(user){
    return NextResponse.json({error: "User already exists"}, {status: 400});
   }

   const newUser = await prisma.user.create({
    data: {email, password}
   })

   return NextResponse.json({message: "User created successfully"}, {status: 201});
   } catch (error) {
    return NextResponse.json({error: "Internal server error"}, {status: 500});
   }

   
   
}