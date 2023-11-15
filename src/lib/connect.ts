import mongoose from "mongoose"

declare global {
    var mongoose : any
}

let cached = global.mongoose

if(!cached) {
    cached = {conn : null, promise : null}
}

const connect = async () => {
    if(cached.conn) {
        return cached.conn
    }
    if(!cached.promise) {
        cached.promise = await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string)
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