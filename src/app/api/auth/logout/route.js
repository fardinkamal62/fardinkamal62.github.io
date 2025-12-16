export async function POST(req) {
    return Response.json(
        { success: true },
        { 
            status: 200,
            headers: {
                'Set-Cookie': 'dashboard-token=; Path=/; HttpOnly; Max-Age=0; SameSite=Strict'
            }
        }
    );
}
