import mongoose from "mongoose"

declare global {
    var mongoose : any
}

let cached = global.mongoose

if(!cached) {
    cached = global.mongoose = {conn : null, promise : null}
}

async function connect () {
    if(cached.conn) {
        return cached.conn
    }
    if(!cached.promise) {
        const opts = {
            bufferCommands: false,
        }
        cached.promise = await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string, opts)
        .then((mongoose) => mongoose)
    }

    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null
        throw error
    }
    return cached.conn
}

export default connect