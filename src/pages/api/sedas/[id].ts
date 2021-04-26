import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '@/services/mongodb'

import { ObjectId } from 'mongodb'
import Archetype from 'archetype-js'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method, query: { id } } = req
    const { db } = await connectToDatabase()

    const { key } = await JSON.parse(req.body)

    switch (method) {
      case 'PUT':
        if (key === process.env.KEY) {
          const data = await JSON.parse(req.body)
          delete data.key
          db.collection('sedas').updateOne({ _id: Archetype.to(id, ObjectId) }, { $set: data })
            .then(() => {
              res.status(200).json({ message: 'Seda modificada.' })
            })
        } else {
          res.status(409).json({ message: 'Chave inválida.' })
        }

        break
      case 'DELETE':
        if (key === process.env.KEY) {
          db.collection('sedas').deleteOne({ _id: Archetype.to(id, ObjectId) })
            .then(() => {
              res.status(200).json({ message: 'Seda deletada.' })
            })
        } else {
          res.status(409).json({ message: 'Chave inválida.' })
        }

        break
      default:
        res.status(405).end(`Method ${method} Not Allowed.`)
    }
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
