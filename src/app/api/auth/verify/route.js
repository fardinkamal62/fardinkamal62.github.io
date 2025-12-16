import { verifySession } from '@/middleware/auth';
import { cookies } from 'next/headers';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('dashboard-token')?.value;
        
        const isValid = verifySession(token);
        
        return Response.json(
            { authenticated: isValid },
            { status: 200 }
        );
    } catch (error) {
        console.error('Verify error:', error);
        return Response.json(
            { authenticated: false },
            { status: 200 }
        );
    }
}
