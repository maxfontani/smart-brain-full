const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const knex = require( 'knex')
const handleRegister = require('./controllers/register.js')
const handleSignin = require('./controllers/signin.js')
const handleProfile = require('./controllers/profile.js')
const image = require('./controllers/image.js')

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

const app = express()
const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
})

app.use(cors())
app.options('*', cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  });

app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

app.post('/api/signin', (req,res) => handleSignin(req,res,db,bcrypt))
app.post('/api/register', (req,res) => handleRegister(req,res,db,bcrypt))
app.get('/api/profile/:id', (req,res) => handleProfile(req,res,db))
app.put('/api/image', (req,res) => image.handleImage(req,res,db))
app.post('/api/imageurl', (req,res) => image.handleApiCall(req,res))

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`App is running on port ${PORT}`))