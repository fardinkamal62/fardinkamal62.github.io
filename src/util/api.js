import axios from 'axios';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * @function get
 * @description POST request to API
 * @param route{string} - API route
 * @param data{object} - Data to send
 * @return {Object} - Response data
 * @throws {Error} - Error status text
 */

export async function get(route = '/', data = {}){
    try {
        const request = await axios.post(NEXT_PUBLIC_API_URL + route, data);

        return request.data;
    } catch (e) {
        throw new Error(e.response.statusText);
    }
}
