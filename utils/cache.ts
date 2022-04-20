import { createClient } from 'redis'
import config from '../config'

const host = config.redis_host as string
const port = config.redis_port as number
const username = config.redis_username as string
const password = config.redis_password as string

const cache = (async () => {
    try {
        const client = createClient({
            url: `redis://${username}:${password}@${host}:${port}`,
        })

        client.on('error', (err: any) => console.log('Redis Client Error', err))
        await client.connect()
    } catch (err: any) {
        console.log('err: ', err.message)
    }
})()

export default cache
