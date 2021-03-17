import jwt from 'jsonwebtoken'

const requireAuth = (req, res, next) => {

    const { authorization } = req.headers
    
    if (!authorization) {
        return res.status(401).json('Unauthorized code 1')
    }

    jwt.verify(
        authorization, 
        process.env.REACT_APP_JWT, 
        function(err, decoded) {
            if (err) {
            return res.status(401).json('Unauthorized code 2')
        }})

    console.log('YOU SHALL PAAASSS!!!')
    return next()
}

export default requireAuth