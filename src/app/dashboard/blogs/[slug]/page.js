'use client';

import DashboardLayout from '@/components/DashboardLayout';
import RichTextEditor from '@/components/RichTextEditor';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditBlogPage() {
    const router = useRouter();
    const params = useParams();
    const slug = params.slug;
    
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [blog, setBlog] = useState({
        title: '',
        oneLiner: '',
        content: '',
        navbar: [],
        technologies: [],
        link: '',
        precedence: 0,
        slug: ''
    });
    const [techInput, setTechInput] = useState('');
    const [navbarInput, setNavbarInput] = useState({ title: '', url: '' });

    useEffect(() => {
        loadBlog();
    }, [slug]);

    const loadBlog = async () => {
        try {
            const response = await axios.get('/api/dashboard/blogs');
            const foundBlog = response.data.find((b) => b.slug === slug);
            if (foundBlog) {
                setBlog({
                    ...foundBlog,
                    technologies: foundBlog.technologies || [],
                    slug: foundBlog.slug || foundBlog._key.replace('blog:', '')
                });
            } else {
                alert('Blog not found');
                router.push('/dashboard/blogs');
            }
        } catch (error) {
            console.error('Error loading blog:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTech = () => {
        if (techInput.trim()) {
            setBlog({
                ...blog,
                technologies: [...blog.technologies, techInput.trim()]
            });
            setTechInput('');
        }
    };

    const handleRemoveTech = (index) => {
        setBlog({
            ...blog,
            technologies: blog.technologies.filter((_, i) => i !== index)
        });
    };

    const handleAddNavbarItem = () => {
        if (navbarInput.title.trim() && navbarInput.url.trim()) {
            setBlog({
                ...blog,
                navbar: [...blog.navbar, { title: navbarInput.title.trim(), url: navbarInput.url.trim() }]
            });
            setNavbarInput({ title: '', url: '' });
        }
    };

    const handleRemoveNavbarItem = (index) => {
        setBlog({
            ...blog,
            navbar: blog.navbar.filter((_, i) => i !== index)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            await axios.put('/api/dashboard/blogs', { ...blog, id: slug });
            router.push('/dashboard/blogs');
        } catch (error) {
            console.error('Error updating blog:', error);
            alert('Error updating blog');
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    Edit Blog Post
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    value={blog.title}
                                    onChange={(e) =>
                                        setBlog({ ...blog, title: e.target.value })
                                    }
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Slug
                                </label>
                                <input
                                    type="text"
                                    value={blog.slug}
                                    onChange={(e) =>
                                        setBlog({ ...blog, slug: e.target.value })
                                    }
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    One-Liner *
                                </label>
                                <input
                                    type="text"
                                    value={blog.oneLiner}
                                    onChange={(e) =>
                                        setBlog({ ...blog, oneLiner: e.target.value })
                                    }
                                    placeholder="A brief one-line description"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Full Content (HTML) *
                                </label>
                                <RichTextEditor
                                    value={blog.content}
                                    onChange={(content) =>
                                        setBlog({ ...blog, content })
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Link
                                </label>
                                <input
                                    type="text"
                                    value={blog.link}
                                    onChange={(e) =>
                                        setBlog({ ...blog, link: e.target.value })
                                    }
                                    placeholder={`/blogs/${blog.slug}`}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Precedence (for ordering)
                                </label>
                                <input
                                    type="number"
                                    value={blog.precedence}
                                    onChange={(e) =>
                                        setBlog({ ...blog, precedence: parseInt(e.target.value) || 0 })
                                    }
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Navigation Items
                                </label>
                                <div className="space-y-2">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={navbarInput.title}
                                            onChange={(e) => setNavbarInput({ ...navbarInput, title: e.target.value })}
                                            placeholder="Nav Title"
                                            className="block w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        />
                                        <input
                                            type="text"
                                            value={navbarInput.url}
                                            onChange={(e) => setNavbarInput({ ...navbarInput, url: e.target.value })}
                                            placeholder="#section-id"
                                            className="block w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddNavbarItem}
                                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                        >
                                            Add
                                        </button>
                                    </div>
                                    <div className="space-y-2">
                                        {blog.navbar?.map((item, index) => (
                                            <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                                                <span className="flex-1 text-sm text-gray-900 dark:text-white">
                                                    {item.title} → {item.url}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveNavbarItem(index)}
                                                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Technologies/Tags
                                </label>
                                <div className="mt-1 flex gap-2">
                                    <input
                                        type="text"
                                        value={techInput}
                                        onChange={(e) => setTechInput(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleAddTech();
                                            }
                                        }}
                                        placeholder="Add tag"
                                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddTech}
                                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    >
                                        Add
                                    </button>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {blog.technologies?.map((tech, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                                        >
                                            {tech}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveTech(index)}
                                                className="ml-2 text-green-600 dark:text-green-300 hover:text-green-800 dark:hover:text-green-100"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end space-x-4">
                        <Link
                            href="/dashboard/blogs"
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
