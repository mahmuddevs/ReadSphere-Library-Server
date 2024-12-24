import express from 'express'
import { booksCollection } from '../db/db.collections.js'
import { verifyToken } from '../configs/jwt.js';

const bookRouter = express.Router()


bookRouter.get('/all-books', verifyToken, async (req, res) => {
    const book = booksCollection.find();
    const result = await book.toArray()

    res.send(result)
})

bookRouter.post('/add-book', async (req, res) => {
    const data = req.body
    console.log(data)
    try {
        const result = await booksCollection.insertOne(data)
        res.send(result)
    }
    catch (err) {
        res.status(501).send({ message: "Server Side Error" })
    }

})

export default bookRouter