import jwt from 'jsonwebtoken'
import createSession from './jwtFns.js'

function signinAuth(req,res,db,bcrypt) {

    const { authorization } = req.headers

    authorization ? getAuthTOkenId() : checkPassword()

    function getAuthTOkenId() {
        try {
            const decoded = jwt.verify(authorization, process.env.REACT_APP_JWT)
            return res.status(200).json(decoded)
          } catch(err) {
            return res.status(400).json('Token error.')
          }
    }

    function checkPassword() {
        const {login, password} = req.body

        if (!login || !password) {
            return res.status(400).json('Incorrect form submission.')
        }

        db.select('login','hash').from('login').where({ login })
            .then(data => {
                if (data.length && bcrypt.compareSync(password,data[0].hash)) {
                    db.select('id','login')
                        .from('users')
                        .where({ login })
                        .then(user => {
                            return user[0].id && user[0].login 
                                    ? createSession(user[0])
                                    : Promise.reject('Session creation failed.')
                        })
                        .then(session => res.status(200).json(session))
                } else {
                    res.status(400).json('Invalid login/password.')
                }
            })
            .catch(err => res.status(400).json("Unable to signin."))
    }
}

export default signinAuth