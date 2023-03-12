import {createClient} from "redis";
import {promisify} from "util";

/**
 * Represent the redis client
 */
class RedisClient {
    /**
     * Create a new Redis Client instance
     */
    constructor() {
        this.client = createClient();
        this.isClientConnected = true;
        this.client.on("error", (err) => {
            console.log("Redis Client failed to connect", err.message | err.toString());
            this.isClientConnected = false;
        })
    }
    // Check connection status and reports
    isAlive() {
        return this.isClientConnected;
    }
    /**
     *
     * @param {*} key
     * @returns a redis value for this key
     */
    async get(key) {
        const redisGet = promisify(this.client.get).bind(this.client);
        return (await redisGet(key))
    }
    /**
     *
     * @param {*} key
     * @param {*} value
     * @param {*} duration
     */
    async set (key, value, duration) {
        const redisSet = promisify(this.client.SETEX).bind(this.client);
        await redisSet(key, duration, value);
    }
    /**
     *
     * @param {*} key
     */
    async del (key) {
        const redisDel = promisify(this.client.del).bind(this.client);
        await redisDel(key);
    }
}
const redisClient = new RedisClient();
module.exports = redisClient