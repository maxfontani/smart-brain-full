import express from 'express'
import bodyParser from 'body-parser'
import bcrypt from 'bcryptjs'
import cors from 'cors'
import knex from 'knex'
import handleRegister from './controllers/register.js'
import handleSignin from './controllers/signin.js'
import handleProfile from './controllers/profile.js'
import image from './controllers/image.js'

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

app.get('/', (req,res) => {res.send('The Smart Brain App is running')})
app.post('/signin', (req,res) => handleSignin(req,res,db,bcrypt))
app.post('/register', (req,res) => handleRegister(req,res,db,bcrypt))
app.get('/profile/:id', (req,res) => handleProfile(req,res,db))
app.put('/image', (req,res) => image.handleImage(req,res,db))
app.post('/imageurl', (req,res) => image.handleApiCall(req,res))

const PORT = process.env.PORT
app.listen(PORT || 4000, () => console.log(`App is running on port ${PORT ? PORT : 4000}`))