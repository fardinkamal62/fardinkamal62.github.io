'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DashboardPage() {
    const [stats, setStats] = useState({
        projects: 0,
        blogs: 0
    });

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const [projectsRes, blogsRes] = await Promise.all([
                axios.get('/api/dashboard/projects'),
                axios.get('/api/dashboard/blogs')
            ]);

            setStats({
                projects: projectsRes.data.length,
                blogs: blogsRes.data.length
            });
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    };

    return (
        <DashboardLayout>
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    Dashboard Overview
                </h1>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg
                                        className="h-6 w-6 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                            Total Projects
                                        </dt>
                                        <dd className="text-3xl font-semibold text-gray-900 dark:text-white">
                                            {stats.projects}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
                            <a
                                href="/dashboard/projects"
                                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500"
                            >
                                Manage projects
                            </a>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg
                                        className="h-6 w-6 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                            Total Blogs
                                        </dt>
                                        <dd className="text-3xl font-semibold text-gray-900 dark:text-white">
                                            {stats.blogs}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
                            <a
                                href="/dashboard/blogs"
                                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500"
                            >
                                Manage blogs
                            </a>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg
                                        className="h-6 w-6 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                            Profile
                                        </dt>
                                        <dd className="text-lg font-semibold text-gray-900 dark:text-white">
                                            Settings
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
                            <a
                                href="/dashboard/profile"
                                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500"
                            >
                                Edit profile
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        Quick Actions
                    </h2>
                    <div className="space-y-3">
                        <a
                            href="/dashboard/projects/new"
                            className="block px-4 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                        >
                            + Create New Project
                        </a>
                        <a
                            href="/dashboard/blogs/new"
                            className="block px-4 py-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-md hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                        >
                            + Create New Blog Post
                        </a>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
