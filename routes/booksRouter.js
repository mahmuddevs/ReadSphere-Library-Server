import express from 'express'
import { booksCollection } from '../db/db.collections.js'
import { verifyToken } from '../configs/jwt.js';
import { ObjectId } from 'mongodb';

const bookRouter = express.Router()


bookRouter.get('/all-books', verifyToken, async (req, res) => {
    try {
        const books = booksCollection.find();
        const result = await books.toArray()
        res.send(result)
    }
    catch (err) {
        res.status(501).send({ message: "Server Side Error" })
    }
})

bookRouter.post('/add-book', async (req, res) => {
    const data = req.body
    try {
        const result = await booksCollection.insertOne(data)
        res.send(result)
    }
    catch (err) {
        res.status(501).send({ message: "Server Side Error" })
    }

})

bookRouter.post('/single-book', async (req, res) => {
    const { id } = req.body
    const query = { _id: new ObjectId(id) }
    try {
        const book = await booksCollection.findOne(query)
        res.send(book)
    }
    catch (err) {
        res.status(501).send({ message: "Server Side Error" })
    }
})

bookRouter.post('/book-by-category', async (req, res) => {
    const { category } = req.body
    const query = { category }

    try {
        const books = booksCollection.find(query)
        const result = await books.toArray()
        res.send(result);
    } catch (err) {
        res.status(501).send({ message: "Server Side Error" })
    }
});


bookRouter.put('/update-book/:id', async (req, res) => {
    const { id } = req.params
    const updateData = req.body

    const { image, name, quantity, author, category, rating } = updateData

    const filter = { _id: new ObjectId(id) };

    try {
        const options = { upsert: true };

        const updateDoc = {
            $set: {
                image,
                name,
                quantity,
                author,
                category,
                rating
            },
        };

        const result = await booksCollection.updateOne(filter, updateDoc, options);
        res.send(result)
    } catch (err) {
        res.status(501).send({ message: "Server Side Error" })
    }
})



export default bookRouter