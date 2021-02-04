import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '@/services/mongodb'

import { ObjectId } from 'mongodb'
import Archetype from 'archetype-js'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method, query: { id } } = req
    const { db } = await connectToDatabase()

    const { name, brand, size, key } = await JSON.parse(req.body)

    switch (method) {
      case 'PUT':
        if (key === process.env.KEY) {
          await db.collection('sedas').updateOne(
            { _id: Archetype.to(id, ObjectId) },
            { name, brand, size }
          ).then(result => console.log(`Deleted ${result} item.`))
            .catch(err => console.error(`Delete failed with error: ${err}`))

          res.status(200)
        } else {
          res.status(409).json({ message: 'Chave inválida.' })
        }
        break
      case 'DELETE':
        if (key === process.env.KEY) {
          await db.collection('sedas').deleteOne({ _id: Archetype.to(id, ObjectId) })
            .then(result => console.log(`Deleted ${result.deletedCount} item.`))
            .catch(err => console.error(`Delete failed with error: ${err}`))

          res.status(200)
        } else {
          res.status(409).json({ message: 'Chave inválida.' })
        }
        break
      default:
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
