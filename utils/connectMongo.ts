import mongoose from 'mongoose'
import config from '../config'

const dbMongo = () => {
    return mongoose
        .connect(config.dbUri as string)
        .then(() => {
            console.log('MongoDB connected')
        })
        .catch((err: any) => {
            console.log('DB error', err.message)
            process.exit(1)
        })
}

export default dbMongo
