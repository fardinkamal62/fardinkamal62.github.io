import axios from 'axios';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * @function get
 * @description GET request to API
 * @param route{string}
 * @return {Promise<any>}
 */
export async function get (route) {
    try {
        return fetch(NEXT_PUBLIC_API_URL + route)
            .then((res) => {
                res.json();
            })
            .then((data) => {
                return data;
            })
            .catch((err) => {
                console.error(err);
                throw new Error('Failed to fetch data from API ' + err);
            });
    } catch (e) {
        console.error(e);
        throw new Error('Failed to fetch data from API ' + e);
    }
};

/**
 * @function post
 * @description POST request to API
 * @param route{string}
 * @param data{object}
 * @return {Promise<any>}
 */

export async function post(route = '/', data = {}){
    try {
        const request = await axios.post(NEXT_PUBLIC_API_URL + route, data);

        return await request.data;
    } catch (e) {
        console.log(e);
        throw new Error('Failed to fetch data from API' + e);
    }
};
