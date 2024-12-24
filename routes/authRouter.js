import express from 'express'
import { generateToken } from '../configs/jwt.js'

const authRouter = express.Router()

const verifyToken = (req, res, next) => {
    const token = req.cookies?.token

    if (!token) {
        return res.status(401).send({ message: 'Unauthorized Access' })
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized Access' })
        }
        next()
    })
}


authRouter.post('/jwt', (req, res) => {
    const email = req.body

    try {
        const token = generateToken(email)

        res.cookie('token', token, {
            httpOnly: true,
            secure: false
        }).send({ success: true })
    } catch (err) {
        return res.status(501).send({ success: false })
    }
})

authRouter.post('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false
    }).send({ success: true })
})


export default authRouter