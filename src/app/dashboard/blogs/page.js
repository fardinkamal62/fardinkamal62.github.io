'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function BlogsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);
    const [allTags, setAllTags] = useState([]);

    useEffect(() => {
        loadBlogs();
    }, []);

    const loadBlogs = async () => {
        try {
            const response = await axios.get('/api/dashboard/blogs');
            setBlogs(response.data);
            setFilteredBlogs(response.data);
            
            // Extract all unique tags
            const tagsSet = new Set();
            response.data.forEach(blog => {
                blog.tags?.forEach(tag => tagsSet.add(tag));
            });
            setAllTags(Array.from(tagsSet).sort());
        } catch (error) {
            console.error('Error loading blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (slug) => {
        if (!confirm('Are you sure you want to delete this blog?')) {
            return;
        }

        try {
            await axios.delete(`/api/dashboard/blogs?slug=${slug}`);
            const updatedBlogs = blogs.filter((b) => b.slug !== slug);
            setBlogs(updatedBlogs);
            filterBlogsByTag(selectedTag, updatedBlogs);
        } catch (error) {
            console.error('Error deleting blog:', error);
            alert('Error deleting blog');
        }
    };

    const filterBlogsByTag = (tag, blogsList = blogs) => {
        setSelectedTag(tag);
        if (!tag) {
            setFilteredBlogs(blogsList);
        } else {
            setFilteredBlogs(blogsList.filter(blog => blog.tags?.includes(tag)));
        }
    };

    return (
        <DashboardLayout>
            <div>
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Blogs
                    </h1>
                    <Link
                        href="/dashboard/blogs/new"
                        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        + New Blog
                    </Link>
                </div>

                {allTags.length > 0 && (
                    <div className="mb-6 bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Filter by Tag:</h3>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => filterBlogsByTag(null)}
                                className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                                    selectedTag === null
                                        ? 'bg-gray-800 dark:bg-gray-600 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                            >
                                All ({blogs.length})
                            </button>
                            {allTags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => filterBlogsByTag(tag)}
                                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                                        selectedTag === tag
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30'
                                    }`}
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                    </svg>
                                    {tag}
                                    <span className="ml-1 text-xs opacity-75">
                                        ({blogs.filter(b => b.tags?.includes(tag)).length})
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : filteredBlogs.length === 0 && selectedTag ? (
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                            No blogs found with tag &quot;{selectedTag}&quot;
                        </p>
                        <button
                            onClick={() => filterBlogsByTag(null)}
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            Clear filter
                        </button>
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                            No blogs yet
                        </p>
                        <Link
                            href="/dashboard/blogs/new"
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            Create your first blog post
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredBlogs.map((blog) => (
                                <li
                                    key={blog.slug}
                                    className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                                {blog.title}
                                            </h3>
                                            <div 
                                                className="mt-1 text-sm text-gray-500 dark:text-gray-400"
                                                dangerouslySetInnerHTML={{ __html: blog.content?.substring(0, 100) + '...' }}
                                            />
                                            <p className="mt-1 text-xs text-gray-400">
                                                Precedence: {blog.precedence || 0}
                                            </p>
                                            {blog.tags && blog.tags.length > 0 && (
                                                <div className="mt-2 flex flex-wrap gap-2">
                                                    {blog.tags.map((tag, index) => (
                                                        <span
                                                            key={index}
                                                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                                                        >
                                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                                            </svg>
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div className="ml-4 flex items-center space-x-2">
                                            <a
                                                href={`/dashboard/blogs/${blog.slug}`}
                                                className="px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                                            >
                                                Edit
                                            </a>
                                            <button
                                                onClick={() => handleDelete(blog.slug)}
                                                className="px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
