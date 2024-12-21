import express from "express"
import 'dotenv/config'
import { connectDB } from "./db/db.config.js"

const app = express()

const port = process.env.PORT || 3001



connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}).catch(console.dir)


