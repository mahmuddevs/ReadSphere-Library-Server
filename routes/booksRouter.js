import express from 'express'
import { booksCollection, borrowedCollection } from '../db/db.collections.js'
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

bookRouter.get("/available-books", async (req, res) => {
    const filter = { quantity: { $gt: 0 } };
    try {
        const books = booksCollection.find(filter)
        const result = await books.toArray()
        res.send(result);
    } catch (err) {
        res.status(501).send({ message: "Server Side Error" })
    }
})

bookRouter.post('/borrow-book', async (req, res) => {
    const requestDate = new Date();
    const { userName, userEmail, bookID, returnDate } = req.body;

    const borrowedBook = { userName, userEmail, bookID, requestDate, returnDate };

    try {
        const existing = await borrowedCollection.findOne({ bookID, userEmail });

        if (existing) {
            return res.send({ message: "Already Borrwed" })
        }

        const result = await borrowedCollection.insertOne(borrowedBook);

        if (result?.acknowledged) {
            const query = { _id: new ObjectId(bookID) };
            const option = { $inc: { quantity: -1 } };

            const updateQuantity = await booksCollection.updateOne(query, option);

            if (updateQuantity.modifiedCount > 0) {
                return res.send({ message: "Successfully Borrowed Book" });
            } else {
                return res.send({ message: "Failed to update book quantity or book not found." });
            }
        } else {
            return res.send({ message: "Failed to borrow book. Insertion failed." });
        }
    } catch (err) {
        console.error(err);
        return res.status(501).send({ message: "Server Side Error" });
    }
});

bookRouter.post('/verify-borrow', async (req, res) => {
    const { userEmail, id } = req.body
    const query = { userEmail, bookID: id }

    try {
        const existing = await borrowedCollection.findOne(query);

        if (existing) {
            return res.send({ borrowed: true })
        }
        res.send({ borrowed: false })
    } catch (err) {
        console.error(err);
        return res.status(501).send({ message: "Server Side Error" });
    }
})

bookRouter.get('/borrowed-book/:email', verifyToken, async (req, res) => {
    const { email } = req.params
    try {
        const borrowedBooks = await borrowedCollection.aggregate([
            {
                $match: { userEmail: email }
            },
            {
                $addFields: {
                    bookID: { $toObjectId: "$bookID" }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "bookID",
                    foreignField: "_id",
                    as: "bookDetails"
                }
            },
            {
                $unwind: {
                    path: "$bookDetails",
                }
            }
        ]).toArray();

        res.send(borrowedBooks)

    } catch (err) {
        console.error(err);
        return res.status(501).send({ message: "Server Side Error" });
    }
})

bookRouter.get('/return-book/:id', async (req, res) => {
    const { id } = req.params
    try {
        const query = { _id: new ObjectId(id) }
        const data = await borrowedCollection.findOne(query)
        const bookID = data.bookID
        const filter = { _id: new ObjectId(bookID) }

        const option = { $inc: { quantity: 1 } };

        const increseQuantity = await booksCollection.updateOne(filter, option);

        if (increseQuantity.modifiedCount > 0) {
            const result = await borrowedCollection.deleteOne(query)

            return res.send(result)
        } else {
            return res.send("Book Return Failed")
        }

    } catch (err) {
        console.error(err);
        return res.status(501).send({ message: "Server Side Error" });
    }
})

export default bookRouter