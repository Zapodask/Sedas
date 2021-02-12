import { connectToDatabase } from '@/services/api/mongodb'

const Pagination = async (collection: string, page: any, limit: any) => {
  const { db } = await connectToDatabase()

  const skips = limit * (page - 1)

  const data = await db.collection(collection).find().sort({ _id: -1 }).limit(parseInt(limit)).skip(skips).toArray()

  return data
}

export default Pagination
