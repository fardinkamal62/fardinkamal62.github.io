export async function GET() {
    return new Response(JSON.stringify({ message: "Hello" }), {
        status: 200,
        statusText: 'OK',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}