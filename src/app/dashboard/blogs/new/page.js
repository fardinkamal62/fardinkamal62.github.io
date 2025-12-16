'use client';

import DashboardLayout from '@/components/DashboardLayout';
import RichTextEditor from '@/components/RichTextEditor';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function NewBlogPage() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [blog, setBlog] = useState({
        title: '',
        description: '',
        technologies: [],
        link: '',
        icon: '',
        precedence: 0,
        slug: ''
    });
    const [techInput, setTechInput] = useState('');

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

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const slug = blog.slug || generateSlug(blog.title);
            await axios.post('/api/dashboard/blogs', { ...blog, slug });
            router.push('/dashboard/blogs');
        } catch (error) {
            console.error('Error creating blog:', error);
            alert('Error creating blog');
            setSaving(false);
        }
    };

    return (
        <DashboardLayout>
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    Create New Blog Post
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
                                    Slug (auto-generated if empty)
                                </label>
                                <input
                                    type="text"
                                    value={blog.slug}
                                    onChange={(e) =>
                                        setBlog({ ...blog, slug: e.target.value })
                                    }
                                    placeholder={generateSlug(blog.title)}
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
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Link
                                </label>
                                <input
                                    type="text"
                                    value={blog.link}
                                    onChange={(e) =>
                                        setBlog({ ...blog, link: e.target.value })
                                    }
                                    placeholder={`/blogs/${blog.slug || generateSlug(blog.title)}`}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Icon Name
                                </label>
                                <input
                                    type="text"
                                    value={blog.icon}
                                    onChange={(e) =>
                                        setBlog({ ...blog, icon: e.target.value })
                                    }
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
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Description (HTML) *
                                </label>
                                <RichTextEditor
                                    value={blog.description}
                                    onChange={(content) =>
                                        setBlog({ ...blog, description: content })
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
                            {saving ? 'Creating...' : 'Create Blog Post'}
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
