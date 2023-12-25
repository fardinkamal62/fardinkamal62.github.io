import * as database from '@/util/db'

export async function POST(req) {
    const body = await req.json();
    try {
        const data = await database.get('data', body, 10);

        return new Response(JSON.stringify(data), {
            status: 200,
            statusText: 'OK',
            headers: {
                'Content-Type': 'application/json'
            },
        })
    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify(e), {
            status: 500,
            statusText: 'Internal Server Error',
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }
}
