import { verifySession } from '@/middleware/auth';
import { cookies } from 'next/headers';
import * as database from '@/util/db';

// Get profile data
export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('dashboard-token')?.value;
        
        if (!verifySession(token)) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }
        
        const data = await database.get('data', { _key: 'profile' }, 1);
        const tagline = await database.get('data', { _key: 'about:oneliner' }, 1);
        const description = await database.get('data', { _key: 'about:description' }, 1);
        
        if (data.length === 0) {
            return Response.json({ 
                name: 'Fardin Kamal',
                photo: 'https://avatars.githubusercontent.com/u/70953546?v=4',
                tagline: tagline.length > 0 ? tagline[0].content : '',
                description: description.length > 0 ? description[0].content : ''
            }, { status: 200 });
        }
        
        return Response.json(data[0], { status: 200 });
    } catch (error) {
        console.error('Get profile error:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// Update profile data
export async function PUT(req) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('dashboard-token')?.value;
        
        if (!verifySession(token)) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }
        
        const body = await req.json();
        const { name, photo, tagline, description } = body;
        
        // Check if profile exists
        const existing = await database.get('data', { _key: 'profile' }, 1);
        
        if (existing.length === 0) {
            // Create new profile
            await database.set('data', {
                key: 'profile',
                name,
                photo,
                tagline,
                description
            });
        } else {
            // Update existing profile
            await database.update(
                'data',
                { _key: 'profile' },
                { name, photo, tagline, description }
            );
        }
        
        return Response.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Update profile error:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}
