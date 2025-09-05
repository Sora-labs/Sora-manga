import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error("No database found.");
}

if (!MONGODB_URI) throw new Error('MONGODB_URI not defined');

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null }
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  cached.conn = await mongoose.connect(`${MONGODB_URI}`).then(mongoose => mongoose)

  console.log("Connected to MongoDB", MONGODB_URI);

  return cached.conn
}

dbConnect().catch(err => console.log(err));

export default dbConnect;