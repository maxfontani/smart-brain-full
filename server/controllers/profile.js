function handleProfile(req, res, db) {
    const {id} = req.params

    db.select('*').from('users').where({id})
        .then(user => {
            user.length
            ? res.json(user[0])
            : res.status(404).json('No such user!')
        })
        .catch(err => res.status(400).json('error getting user info'))
}

export default handleProfile