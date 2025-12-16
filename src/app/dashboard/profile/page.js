'use client';

import DashboardLayout from '@/components/DashboardLayout';
import RichTextEditor from '@/components/RichTextEditor';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [profile, setProfile] = useState({
        name: '',
        photo: '',
        tagline: '',
        description: ''
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const response = await axios.get('/api/dashboard/profile');
            setProfile(response.data);
        } catch (error) {
            console.error('Error loading profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setSuccess(false);

        try {
            await axios.put('/api/dashboard/profile', profile);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (error) {
            console.error('Error saving profile:', error);
            alert('Error saving profile');
        } finally {
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
                    Edit Profile
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                        <div className="space-y-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={profile.name}
                                    onChange={(e) =>
                                        setProfile({ ...profile, name: e.target.value })
                                    }
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="photo"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Photo URL
                                </label>
                                <input
                                    type="url"
                                    id="photo"
                                    value={profile.photo}
                                    onChange={(e) =>
                                        setProfile({ ...profile, photo: e.target.value })
                                    }
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    required
                                />
                                {profile.photo && (
                                    <img
                                        src={profile.photo}
                                        alt="Profile preview"
                                        className="mt-2 h-32 w-32 rounded-full object-cover"
                                    />
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="tagline"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                >
                                    Tagline (HTML supported)
                                </label>
                                <RichTextEditor
                                    value={profile.tagline}
                                    onChange={(content) =>
                                        setProfile({ ...profile, tagline: content })
                                    }
                                    height={200}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                >
                                    Description (HTML supported)
                                </label>
                                <RichTextEditor
                                    value={profile.description}
                                    onChange={(content) =>
                                        setProfile({ ...profile, description: content })
                                    }
                                    height={300}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            {success && (
                                <span className="text-green-600 dark:text-green-400 text-sm">
                                    Profile saved successfully!
                                </span>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? 'Saving...' : 'Save Profile'}
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
