import { verifySession } from '@/middleware/auth';
import { cookies } from 'next/headers';
import * as database from '@/util/db';

// Get all projects
export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('dashboard-token')?.value;
        
        if (!verifySession(token)) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }
        
        // Get all documents where _key starts with 'project:'
        const data = await database.get('data', { _key: { $regex: '^project:' } }, 1000);
        
        // Filter out 'project:short' and add slug from _key
        const projects = data
            .filter(item => item._key !== 'project:short')
            .map(item => ({
                ...item,
                slug: item._key.replace('project:', '')
            }));

        return Response.json(projects, { status: 200 });
    } catch (error) {
        console.error('Get projects error:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// Create new project
export async function POST(req) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('dashboard-token')?.value;
        
        if (!verifySession(token)) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }
        
        const body = await req.json();
        const { title, oneLiner, content, navbar, footer, slug } = body;
        
        await database.set('data', {
            key: `project:${slug}`,
            title,
            oneLiner,
            content: content || [],
            navbar: navbar || [],
            footer: footer || { title: 'Links', id: 'links', content: [] },
            createdAt: new Date().toISOString()
        });
        
        return Response.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error('Create project error:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// Update project
export async function PUT(req) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('dashboard-token')?.value;
        
        if (!verifySession(token)) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }
        
        const body = await req.json();
        const { id, title, oneLiner, content, navbar, footer } = body;
        
        await database.update(
            'data',
            { _key: `project:${id}` },
            {
                title,
                oneLiner,
                content: content || [],
                navbar: navbar || [],
                footer: footer || { title: 'Links', id: 'links', content: [] }
            }
        );
        
        return Response.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Update project error:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// Delete project
export async function DELETE(req) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('dashboard-token')?.value;
        
        if (!verifySession(token)) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }
        
        const { searchParams } = new URL(req.url);
        const slug = searchParams.get('slug');
        
        await database.remove('data', { _key: `project:${slug}` });
        
        return Response.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Delete project error:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}
