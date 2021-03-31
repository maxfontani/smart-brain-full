import createSession from './jwtFns.js'

function handleRegister(req,res,db,bcrypt) {
    const { email, login, password } = req.body

    if (!email || !login || !password) {
        return res.status(400).json('incorrect form submission')
    }

    function loginUnique() {
        return db.select('id').from('users').where({ login })
            .then(data => data.length)                  
    }

    function condChain(userExists) {
        if (userExists) {
            return res.status(400).json('invalid new login')
        } else {
            registerNewUser()
        }
    }

    function registerNewUser() {
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)      

            db.transaction(trx => {
                trx.insert({
                hash: hash,
                login: login
                })
                .into('login')
                .returning('login')
                .then(newLogin => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: email,
                        login: newLogin[0],
                        joined: new Date(),
                    })
                    .then(user => {
                    const { token } = createSession(user[0])
                    res.status(200).json({user: user[0], token});
                    })
                })
                .then(trx.commit)
                .catch(trx.rollback)
            })
            .catch(err => {
                res.status(400).json('Unable to register.')
            })
        }

    loginUnique().then(data => condChain(data))  
}

export default handleRegister