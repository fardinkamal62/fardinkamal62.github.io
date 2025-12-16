'use client';

import DashboardLayout from '@/components/DashboardLayout';
import RichTextEditor from '@/components/RichTextEditor';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';

export default function EditBlogPage() {
    const router = useRouter();
    const params = useParams();
    const slug = params.slug;
    
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [blog, setBlog] = useState({
        title: '',
        description: '',
        content: '',
        technologies: [],
        image: '',
        slug: ''
    });
    const [techInput, setTechInput] = useState('');

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
                                    Short Description *
                                </label>
                                <textarea
                                    value={blog.description}
                                    onChange={(e) =>
                                        setBlog({ ...blog, description: e.target.value })
                                    }
                                    rows={3}
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

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Featured Image URL
                                </label>
                                <input
                                    type="url"
                                    value={blog.image}
                                    onChange={(e) =>
                                        setBlog({ ...blog, image: e.target.value })
                                    }
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                />
                                {blog.image && (
                                    <img
                                        src={blog.image}
                                        alt="Preview"
                                        className="mt-2 h-32 rounded object-cover"
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end space-x-4">
                        <a
                            href="/dashboard/blogs"
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                            Cancel
                        </a>
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
