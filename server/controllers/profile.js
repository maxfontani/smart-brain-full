export function handleProfileGet(req, res, db) {
    const { id } = req.params

    db.select('*')
        .from('users')
        .where({ id })
        .then(user => {
            user.length
                ? res.status(200).json(user[0])
                : res.status(404).json('No such user!')
        })
        .catch(err => {
            console.log(err)
            res.status(400).json('error getting user info')
        })
}

export function handleProfileUpdate(req, res, db) {
    const { id } = req.params
    // const { name, email, birthday } = req.body
    console.log("REQ BODY: ", req.body) 

    if (Object.keys(req.body).length) {
        db('users')
            .where({ id })
            .update({ ...req.body })
            .then(res_db => {
                if (res_db) {
                    res.status(200).json("success")
                } else {
                    res.status(400).json("Unable to update profile")
                }})
                .catch(err => {
                    console.log("ERROR:", err)
                    res.status(400).json("error updating profile")
                })
    } else {
        res.status(400).json("Invalid update info")
    }
}


