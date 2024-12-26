import express from 'express'
import { generateToken } from '../configs/jwt.js'

const authRouter = express.Router()


authRouter.post('/jwt', (req, res) => {
    const email = req.body

    try {
        const token = generateToken(email)

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        }).send({ success: true })
    } catch (err) {
        res.status(501).send({ success: false })
    }
})

authRouter.post('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    }).send({ success: true })
})


export default authRouter