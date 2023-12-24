import * as database from '@/util/db'

export async function GET() {
    const data = await database.get();

    return new Response(JSON.stringify(data), {
        status: 200,
        statusText: 'OK',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}