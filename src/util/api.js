const api = module.exports;

const API_URL = process.env.API_URL;

/**
 * @function get
 * @description GET request to API
 * @param route{string}
 * @return {Promise<any>}
 */
api.get = async (route) => {
    try {

        return fetch(API_URL + route).then((res) => {
            return res.json();
        }).catch((err) => {
            console.log(err);
            throw new Error('Failed to fetch data from API' + err);
        });
    } catch (e) {
        console.log(e);
        throw new Error('Failed to fetch data from API' + e);
    }
};

/**
 * @function post
 * @description POST request to API
 * @param route{string}
 * @param data{object}
 * @return {Promise<any>}
 */
api.post = (route, data = {}) => {
    try {
        return fetch(API_URL + route, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((res) => {
            return res.json();
        }).catch((err) => {
            console.log(err);
            throw new Error('Failed to fetch data from API' + err);
        });
    } catch (e) {
        console.log(e);
        throw new Error('Failed to fetch data from API' + e);
    }
};