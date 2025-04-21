import { GameIdTypes } from "@/components/GamePage/types"
import { NextRequest, NextResponse } from "next/server"

type idType = {
    params:{
        id: string
    }
}

export async function GET(_req:NextRequest, context:idType):Promise<Response>{
    const {id} = await context.params
    if(!id){
        return NextResponse.json({ message: 'id has not passed correctly' }, { status: 400 })
    }
    try{
        const response = await fetch(`https://www.freetogame.com/api/game?id=${id}`)
        const result:GameIdTypes = await response.json()
        if(response.statusText ===  'Not Found'){
            return NextResponse.json({ error: 'Requested Data could not be found!' })
        }
        return new Response(JSON.stringify(result),{status:200})
    } catch(error:unknown){
        if(error instanceof Error){
            return NextResponse.json({Error: error.message})
        }
    }
    return NextResponse.json({Error : 'Something Went Wrong'})
}