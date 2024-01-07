const api = module.exports;

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * @function get
 * @description GET request to API
 * @param route{string}
 * @return {Promise<any>}
 */
api.get = async (route) => {
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
api.post = async (route = '/', data = {}) => {
    try {
        const request = await fetch(NEXT_PUBLIC_API_URL + route, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        })

        return await request.json();
    } catch (e) {
        console.log(e);
        throw new Error('Failed to fetch data from API' + e);
    }
};