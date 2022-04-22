import { createClient } from 'redis'
import config from '../config'

const host = config.redis_host as string
const port = config.redis_port as number

const redisCrud = async (client: any) => {
    // set in redis
    client.set('age', '26')
    // get from redis
    let value = await client.get('age')
    // delete in redis
    client.del('name')
}
const redisList = async (client: any) => {
    // create  list & add item to top of the list
    client.lPush('names', 'Flavio')
    // add item to bottom
    client.rPush('names', 'Roger')
    // listing all items of the list
    const result = await client.lRange('names', 0, -1)
    console.log(result)
    // delete an item
    client.rPop('names')
    // delete a list
    client.del('names')
}
const redisSets = async (client: any) => {
    // create a set && add item to a set
    client.sAdd('username', 'bob')
    // add multiple items to a set
    client.sAdd('names', 'Roger', 'Syd')
    // listing items inside a set
    const names = await client.sMembers('names')
    console.log(names)
    // delete random item from set
    client.sPop('names')
    // delete a set
    client.del('names')
}
const redisHashes = async (client: any) => {
    // create a hash
    client.hSet('person:1', 'name', 'Flavio', 'age', 37)

    // get all hash properties
    let items = await client.hGetAll('person:1')
    console.log(items)

    // update a hash
    client.hSet('person:1', 'name', 'sam', 'age', 26)

    // increment a value inside a hash
    client.hIncrBy('person:1', 'age', 1)

    // delete a hash
    client.del('person:1')
}
const redisSubscriptions = async (publisher: any, subscriber: any) => {
    const channel = 'channel_name'

    // publish into a channel
    publisher.publish(channel, 'message')

    // subscribe to a channel
    await subscriber.subscribe('dogs', (message: any) => {
        console.log(channel, message)
    })

    // create 2 redis client connection (subscriber / publisher) with the same client instance
}
const cache = (async () => {
    try {
        const client = createClient({ url: `redis://${host}:${port}` })
        const subscriber = createClient({ url: `redis://${host}:${port}` })

        client.on('error', (err: any) => console.log('Redis Client Error', err))
        await client.connect()
        console.log('redis is running')

        // redisCrud(client)
        // redisLists(client)
        // redisSets(client)
        // redisHashes(client)
        // redisSubscriptions(client, subscriber)
    } catch (err: any) {
        console.log('err: ', err.message)
    }
})()

export default cache
