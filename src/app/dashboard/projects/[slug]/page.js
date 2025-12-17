'use client';

import DashboardLayout from '@/components/DashboardLayout';
import RichTextEditor from '@/components/RichTextEditor';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditProjectPage() {
    const router = useRouter();
    const params = useParams();
    const slug = params.slug;
    
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [project, setProject] = useState({
        title: '',
        oneLiner: '',
        content: [],
        navbar: [],
        footer: {
            title: 'Links',
            id: 'links',
            content: []
        },
        slug: ''
    });

    const loadProject = useCallback(async () => {
        try {
            const response = await axios.get('/api/dashboard/projects');
            const foundProject = response.data.find((p) => p.slug === slug);
            if (foundProject) {
                setProject({
                    ...foundProject,
                    content: foundProject.content || [],
                    navbar: foundProject.navbar || [],
                    footer: foundProject.footer || { title: 'Links', id: 'links', content: [] },
                    slug: foundProject.slug || foundProject._key.replace('project:', '')
                });
            } else {
                alert('Project not found');
                router.push('/dashboard/projects');
            }
        } catch (error) {
            console.error('Error loading project:', error);
        } finally {
            setLoading(false);
        }
    }, [slug, router]);

    useEffect(() => {
        loadProject();
    }, [loadProject]);

    const handleAddContentSection = () => {
        const id = prompt('Enter section ID (e.g., story, learning):');
        if (id) {
            setProject({
                ...project,
                content: [
                    ...project.content,
                    { id, title: '', content: '' }
                ]
            });
        }
    };

    const handleUpdateContentSection = (index, field, value) => {
        const newContent = [...project.content];
        newContent[index][field] = value;
        setProject({ ...project, content: newContent });
    };

    const handleRemoveContentSection = (index) => {
        setProject({
            ...project,
            content: project.content.filter((_, i) => i !== index)
        });
    };

    const handleAddNavItem = () => {
        const title = prompt('Enter nav title:');
        const url = prompt('Enter nav URL (e.g., #story):');
        if (title && url) {
            setProject({
                ...project,
                navbar: [...project.navbar, { title, url }]
            });
        }
    };

    const handleRemoveNavItem = (index) => {
        setProject({
            ...project,
            navbar: project.navbar.filter((_, i) => i !== index)
        });
    };

    const handleAddFooterLink = () => {
        const title = prompt('Enter link title:');
        const link = prompt('Enter URL:');
        const icon = prompt('Enter icon name (e.g., github, link):');
        if (title && link) {
            setProject({
                ...project,
                footer: {
                    ...project.footer,
                    content: [
                        ...project.footer.content,
                        { title, link, icon: icon || 'link' }
                    ]
                }
            });
        }
    };

    const handleRemoveFooterLink = (index) => {
        setProject({
            ...project,
            footer: {
                ...project.footer,
                content: project.footer.content.filter((_, i) => i !== index)
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            await axios.put('/api/dashboard/projects', { ...project, id: slug });
            router.push('/dashboard/projects');
        } catch (error) {
            console.error('Error updating project:', error);
            alert('Error updating project');
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
                    Edit Project
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
                                    value={project.title}
                                    onChange={(e) =>
                                        setProject({ ...project, title: e.target.value })
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
                                    value={project.slug}
                                    onChange={(e) =>
                                        setProject({ ...project, slug: e.target.value })
                                    }
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    disabled
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    One Liner *
                                </label>
                                <textarea
                                    value={project.oneLiner}
                                    onChange={(e) =>
                                        setProject({ ...project, oneLiner: e.target.value })
                                    }
                                    rows={2}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    required
                                />
                            </div>

                            {/* Content Sections */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Content Sections
                                    </label>
                                    <button
                                        type="button"
                                        onClick={handleAddContentSection}
                                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        + Add Section
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {project.content?.map((section, index) => (
                                        <div
                                            key={index}
                                            className="border border-gray-300 dark:border-gray-600 rounded p-4"
                                        >
                                            <div className="flex justify-between items-center mb-3">
                                                <div className="flex-1 mr-4">
                                                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                        Section ID
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="e.g., story, learning"
                                                        value={section.id}
                                                        onChange={(e) =>
                                                            handleUpdateContentSection(index, 'id', e.target.value)
                                                        }
                                                        className="block w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveContentSection(index)}
                                                    className="px-3 py-2 text-sm text-red-600 hover:text-red-700 font-medium"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                            <div className="mb-3">
                                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                    Section Title
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Section Title"
                                                    value={section.title}
                                                    onChange={(e) =>
                                                        handleUpdateContentSection(index, 'title', e.target.value)
                                                    }
                                                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                    Content
                                                </label>
                                                <RichTextEditor
                                                    value={section.content}
                                                    onChange={(content) =>
                                                        handleUpdateContentSection(index, 'content', content)
                                                    }
                                                    height={300}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Navbar */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Navigation Items
                                    </label>
                                    <button
                                        type="button"
                                        onClick={handleAddNavItem}
                                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        + Add Nav Item
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {project.navbar?.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 p-2 border border-gray-300 dark:border-gray-600 rounded"
                                        >
                                            <span className="flex-1">{item.title} → {item.url}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveNavItem(index)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer Links */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Footer Links
                                    </label>
                                    <button
                                        type="button"
                                        onClick={handleAddFooterLink}
                                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        + Add Link
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {project.footer?.content?.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 p-2 border border-gray-300 dark:border-gray-600 rounded"
                                        >
                                            <span className="flex-1">
                                                {item.title} ({item.icon}) → {item.link}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveFooterLink(index)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end space-x-4">
                        <Link
                            href="/dashboard/projects"
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
