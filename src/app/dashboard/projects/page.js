'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function ProjectsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const response = await axios.get('/api/dashboard/projects');
            setProjects(response.data);
        } catch (error) {
            console.error('Error loading projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (slug) => {
        if (!confirm('Are you sure you want to delete this project?')) {
            return;
        }

        try {
            await axios.delete(`/api/dashboard/projects?slug=${slug}`);
            setProjects(projects.filter((p) => p.slug !== slug));
        } catch (error) {
            console.error('Error deleting project:', error);
            alert('Error deleting project');
        }
    };

    return (
        <DashboardLayout>
            <div>
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Projects
                    </h1>
                    <a
                        href="/dashboard/projects/new"
                        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        + New Project
                    </a>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : projects.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                            No projects yet
                        </p>
                        <a
                            href="/dashboard/projects/new"
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            Create your first project
                        </a>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            {projects.map((project) => (
                                <li
                                    key={project.slug}
                                    className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                                {project.title}
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                {project.oneLiner}
                                            </p>
                                            <p className="mt-1 text-xs text-gray-400">
                                                {project.content?.length || 0} content sections
                                            </p>
                                        </div>
                                        <div className="ml-4 flex items-center space-x-2">
                                            <a
                                                href={`/dashboard/projects/${project.slug}`}
                                                className="px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                                            >
                                                Edit
                                            </a>
                                            <button
                                                onClick={() => handleDelete(project.slug)}
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
