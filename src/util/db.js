import { connectToDatabase } from "@/util/mongo";

const { db } = await connectToDatabase();

/**
 * @function get
 * @description fetch data from database
 * @param collection{string}
 * @param query{object}
 * @param limit{number}
 * @param sort{object}
 * @return {Promise<*>}
 */
export async function get(collection = 'data', query = {}, limit = 10, sort = { _id: 1 }) {
    const projection = {
        _id: 0,
        // _key: 0
    };

    try {
        return await db.collection(collection).find(query).sort(sort).project(projection).limit(limit).toArray()
    } catch (e) {
        console.log(e);
        throw new Error('Failed to fetch data from database' + e);
    }
}

export async function set(collection = 'data', data = {}) {
    try {
        const { key, ...rest } = data;

        await db.collection(collection).insertOne(
            {
                _key: key,
                ...rest,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
    } catch (e) {
        console.log(e);
        throw new Error('Failed to insert data into database' + e);
    }
}

/**
 * @function update
 * @description update data in database
 * @param collection{string}
 * @param query{object}
 * @param data{object}
 * @return {Promise<*>}
 */
export async function update(collection = 'data', query = {}, data = {}) {
    try {
        const result = await db.collection(collection).updateOne(
            query,
            {
                $set: {
                    ...data,
                    updatedAt: new Date().toISOString()
                }
            }
        );
        return result;
    } catch (e) {
        console.log(e);
        throw new Error('Failed to update data in database: ' + e);
    }
}

/**
 * @function remove
 * @description delete data from database
 * @param collection{string}
 * @param query{object}
 * @return {Promise<*>}
 */
export async function remove(collection = 'data', query = {}) {
    try {
        const result = await db.collection(collection).deleteOne(query);
        return result;
    } catch (e) {
        console.log(e);
        throw new Error('Failed to delete data from database: ' + e);
    }
}
