import express from 'express'
import { booksCollection } from '../db/db.collections.js'

const bookRouter = express.Router()


bookRouter.get('/all-books', async (req, res) => {
    const book = booksCollection.find();
    const result = await book.toArray()

    return res.send(result)
})

bookRouter.post('/add-book', async (req, res) => {
    const data = req.body
    const result = await booksCollection.insertOne(data)
    return res.send(result)
})

export default bookRouter