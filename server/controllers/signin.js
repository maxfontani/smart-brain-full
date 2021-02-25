function handleSignin(req,res,db,bcrypt) {
    const {login, password} = req.body

    if (!login || !password) {
        return res.status(400).json('incorrect form submission')
    }

    db.select('login','hash').from('login').where({ login })
        .then(data => {
            if (data.length && bcrypt.compareSync(password,data[0].hash)) {
                db.select('id','login','email', 'entries', 'joined').from('users').where({login})
                    .then(user => res.status(200).json(user[0]))
            } else {
                res.status(400).json('Invalid login password.')
            }
        })
        .catch(err => res.status(400).json("unable to signin"))
}

export default handleSignin