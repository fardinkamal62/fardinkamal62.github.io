import axios from 'axios';

const configuredBase = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');

async function resolveBase() {
    if (configuredBase) {
        return configuredBase;
    }
    if (typeof window !== 'undefined') {
        return window.location.origin + '/api';
    }
    const { headers } = await import('next/headers');
    const h = await headers();
    const proto = h.get('x-forwarded-proto') || 'http';
    const host = h.get('x-forwarded-host') || h.get('host') || 'localhost:3000';
    return `${proto}://${host}/api`;
}

/**
 * @function get
 * @description POST request to the same-origin API
 * @param route{string} - API route ('/' or '' both hit /api)
 * @param data{object} - Data to send
 * @return {Object} - Response data
 * @throws {Error} - Error status text
 */

export async function get(route = '', data = {}){
    try {
        const base = await resolveBase();
        const request = await axios.post(base + (route === '/' ? '/' : route), data);

        return request.data;
    } catch (e) {
        throw new Error(e.response.statusText);
    }
}
