import Clarifai from 'clarifai'

function handleApiCall(req,res) {
    const { inputUrl } = req.body

    const app = new Clarifai.App({
        apiKey: '9b00d788e4bf4ab39118986114a98924'
    });
    
    const model = {
        id: "f76196b43bbd45c99b4f3cd8e8b40a8a",
        version: "fe995da8cb73490f8556416ecf25cea3"
    }

    app.models.predict(model,inputUrl)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('APA call error'))
}

function handleImage(req,res, db) {
    const { id } = req.body
    db('users').where({ id })
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.status(200).json(entries[0])
    })
    .catch(err => res.status(400).json(err))
}

export default {handleImage, handleApiCall}