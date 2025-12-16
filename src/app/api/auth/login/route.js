import { verifyPassword, createSession } from '@/middleware/auth';

export async function POST(req) {
    try {
        const body = await req.json();
        const { password } = body;
        
        if (!password) {
            return Response.json(
                { error: 'Password is required' },
                { status: 400 }
            );
        }
        
        const isValid = verifyPassword(password);
        
        if (!isValid) {
            return Response.json(
                { error: 'Invalid password' },
                { status: 401 }
            );
        }
        
        const token = createSession();
        
        return Response.json(
            { success: true, token },
            { 
                status: 200,
                headers: {
                    'Set-Cookie': `dashboard-token=${token}; Path=/; HttpOnly; Max-Age=${24 * 60 * 60}; SameSite=Strict`
                }
            }
        );
    } catch (error) {
        console.error('Login error:', error);
        return Response.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
