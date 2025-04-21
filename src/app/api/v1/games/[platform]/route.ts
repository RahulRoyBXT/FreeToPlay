import { NextRequest } from "next/server"

type platformType = {
    params:{
        platform: string
    }
}

export async function GET(_req:NextRequest, context:platformType):Promise<Response>{
    const {platform} = await context.params
    const response = await fetch(`https://www.freetogame.com/api/games?platform=${platform}`)
    const data = await response.json()

    return new Response(JSON.stringify(data),{status:200})
}