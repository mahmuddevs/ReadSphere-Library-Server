import express from "express"
import 'dotenv/config'
import cors from 'cors'
import { connectDB } from "./db/db.config.js"
import bookRouter from "./routes/booksRouter.js"
import authRouter from "./routes/authRouter.js"
import cookieParser from "cookie-parser"

const app = express()

const port = process.env.PORT || 3001

//middleware
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
}))
app.use(cookieParser())
app.use(express.json())


//routes
app.use('/auth', authRouter)
app.use('/books', bookRouter)

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}).catch(console.dir)


