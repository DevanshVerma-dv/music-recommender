import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let cached = global.mongoose || { conn: null, promise: null };  // caching to not create new connections on every request

export async function connectToDB() {
    if (cached.conn) return cached.conn;    // if connection already exists
    if (!cached.promise) {                  // if no connection, create promise to create a new connection
        cached.promise = mongoose.connect(MONGODB_URI).then((mongooseInstance) => mongoose);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}