import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'

export async function POST(req: Request){
    try {
        const currentUser = await getCurrentUser();
        const body = await req.json();
        const {name, image} = body;

        if(!currentUser?.id){
            return new NextResponse('Unauthorized', {status: 401})
        }

        const updatedUser = await prisma?.user.update({
            data:{
                name, image
            },
            where:{
                id: currentUser.id
            }
        })
        
        return NextResponse.json(updatedUser);

    } catch (error: any) {
        console.log(error, 'ERROR_SETTINGS');
        return new NextResponse('Internal Error', {status: 500})
    }
}