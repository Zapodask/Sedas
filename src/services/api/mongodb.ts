import { MongoClient, Db } from 'mongodb'

const uri: any = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB

let cachedClient: MongoClient
let cachedDb: Db

if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

if (!dbName) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  )
}

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

export async function connectToDatabase () {
  if (!client.isConnected()) await client.connect()

  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const db = await client.db(dbName)

  cachedClient = client
  cachedDb = db

  return { client, db }
}
