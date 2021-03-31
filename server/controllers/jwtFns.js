import jwt from 'jsonwebtoken'

export default function createSession(user) {
    const { id, login } = user
    const jwtPayload = { id, login }
    const token = jwt.sign(jwtPayload, process.env.REACT_APP_JWT, {expiresIn: '1h'}) 
    console.log('ENV= ', process.env.REACT_APP_JWT)
    console.log('token= ', token)
    return {status:"success", userId: id, token}
}