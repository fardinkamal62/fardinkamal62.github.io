import * as database from '@/util/db'

export async function POST(req) {
    const body = await req.json() || {};
    const limit = parseInt(body.limit) || 10;

    try {
        const data = await database.get('data', { _key: body._key}, limit);

        if (data.length === 0) {
            return new Response(JSON.stringify({ error: 'No data found' }), {
                status: 404,
                statusText: 'Requested Content was Not Found',
                headers: { 'Content-Type': 'application/json' }
            })
        }

        return new Response(JSON.stringify(data), {
            status: 200,
            statusText: 'OK',
            headers: { 'Content-Type': 'application/json' }
        })
    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify(e), {
            status: 500,
            statusText: 'Internal Server Error',
            headers: { 'Content-Type': 'application/json' }
        })
    }
}
