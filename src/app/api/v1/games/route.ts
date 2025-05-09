import { Game } from "@/lib/types";

export async function GET() {
    const response = await fetch('https://www.freetogame.com/api/games')
    const data:Game[] = await response.json()
    return new Response(JSON.stringify(data.sort((a: Game, b: Game) => a.id - b.id)),{status:200, headers: {'content-type': 'application/json'}})
}