import {connectToDatabase} from "@/util/mongo";

const {db} = await connectToDatabase();

/**
 * @function get
 * @description fetch data from database
 * @param collection{string}
 * @param query{object}
 * @param limit{number}
 * @return {Promise<*>}
 */
export async function get(collection = 'data', query = {}, limit = 10) {
    try {
        return await db.collection(collection).find(query).limit(limit).toArray()
    } catch (e) {
        console.log(e);
        throw new Error('Failed to fetch data from database' + e);
    }
}