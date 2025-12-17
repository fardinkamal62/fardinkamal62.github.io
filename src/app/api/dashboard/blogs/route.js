import { verifySession } from '@/middleware/auth';
import { cookies } from 'next/headers';
import * as database from '@/util/db';

// Get all blogs
export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('dashboard-token')?.value;
        
        if (!verifySession(token)) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }
        
        // Get all documents where _key starts with 'blog:'
        const data = await database.get('data', { _key: { $regex: '^blog:' } }, 1000);
        
        // Filter out 'blog:short' and add slug from _key
        const blogs = data
            .filter(item => item._key !== 'blog:short')
            .map(item => ({
                ...item,
                slug: item._key.replace('blog:', '')
            }));
        
        return Response.json(blogs, { status: 200 });
    } catch (error) {
        console.error('Get blogs error:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// Create new blog
export async function POST(req) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('dashboard-token')?.value;
        
        if (!verifySession(token)) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }
        
        const body = await req.json();
        const { title, description, technologies, link, icon, precedence, slug } = body;
        
        await database.set('data', {
            key: `blog:${slug}`,
            title,
            description,
            technologies: technologies || [],
            link: link || `/blogs/${slug}`,
            icon: icon || '',
            precedence: precedence || 0
        });
        
        return Response.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error('Create blog error:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// Update blog
export async function PUT(req) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('dashboard-token')?.value;
        
        if (!verifySession(token)) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }
        
        const body = await req.json();
        const { id, title, description, oneLiner, technologies, link, icon, precedence, navbar, content } = body;
        
        await database.update(
            'data',
            { _key: `blog:${id}` },
            {
                title,
                description,
                technologies: technologies || [],
                link,
                icon: icon || '',
                precedence: precedence || 0,
                oneLiner: oneLiner || '',
                navbar: navbar || [],
                content: content || ""
            }
        );
        
        return Response.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Update blog error:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// Delete blog
export async function DELETE(req) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('dashboard-token')?.value;
        
        if (!verifySession(token)) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }
        
        const { searchParams } = new URL(req.url);
        const slug = searchParams.get('slug');
        
        await database.remove('data', { _key: `blog:${slug}` });
        
        return Response.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Delete blog error:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}
