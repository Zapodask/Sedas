import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '@/services/mongodb'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req
    const { db } = await connectToDatabase()

    switch (method) {
      case 'GET':
        const { page, search } = req.query

        const p: any = page
        const limit = 10
        const skips = limit * (p - 1)

        const Search = JSON.parse(String(search as any))

        if (Search.brand === '') {
          delete Search.brand
        } else {
          Search.brand = { $regex: `${Search.brand}` }
        }
        if (Search.series === '') {
          delete Search.series
        } else {
          Search.series = { $regex: `${Search.series}` }
        }
        if (Search.type === '') {
          delete Search.type
        } else {
          Search.type = { $regex: `${Search.type}` }
        }
        if (Search.size === '') {
          delete Search.size
        } else {
          Search.size = { $regex: `${Search.size}` }
        }

        const data = await db.collection('sedas').find(Search).sort({ _id: -1 }).limit(limit).skip(skips).toArray()

        res.status(200).json(data)
        break
      case 'POST':
        const { image, brand, series, type, size, key } = await JSON.parse(req.body)

        if (key === process.env.KEY) {
          const response = await db.collection('sedas').insertOne({ image, brand, series, type, size })

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
