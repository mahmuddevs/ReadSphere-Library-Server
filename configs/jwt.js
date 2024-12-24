import jwt from 'jsonwebtoken'


const generateToken = (email) => {
    return jwt.sign(
        email,
        process.env.JWT_SECRET,
        { expiresIn: '5h' }
    )
}

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



export { generateToken, verifyToken }