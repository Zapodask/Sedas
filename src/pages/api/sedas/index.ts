import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '@/services/api/mongodb'

import Pagination from '@/services/api/pagination'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req
    const { db } = await connectToDatabase()

    switch (method) {
      case 'GET':
        const { page } = req.query
        const data = await Pagination('sedas', page, 10)

        res.status(200).json(data)
        break
      case 'POST':
        const { name, brand, image, size, key } = await JSON.parse(req.body)

        if (key === process.env.KEY) {
          const response = await db.collection('sedas').insertOne({ name, brand, image, size })

          res.status(200).json(response)
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

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1000gb'
    }
  }
}

export default handler
