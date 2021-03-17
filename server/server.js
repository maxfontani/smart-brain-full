import express from 'express'
import bcrypt from 'bcryptjs'
import cors from 'cors'
import knex from 'knex'
import handleRegister from './controllers/register.js'
import signinAuth from './controllers/signin.js'
import { handleProfileGet, handleProfileUpdate } from './controllers/profile.js'
import image from './controllers/image.js'
import path from 'path'
import { fileURLToPath } from 'url'
import requireAuth from './controllers/authorization.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

const app = express()
const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: false
    }
})

app.use(cors())
app.options('*', cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  });

app.post('/api/signin', (req,res) => signinAuth(req,res,db,bcrypt))
app.post('/api/register', (req,res) => handleRegister(req,res,db,bcrypt))
app.get('/api/profile/:id', requireAuth, (req,res) => handleProfileGet(req,res,db))
app.post('/api/profile/:id', requireAuth, (req,res) => handleProfileUpdate(req,res,db))
app.put('/api/image', requireAuth, (req,res) => image.handleImage(req,res,db))
app.post('/api/imageurl', requireAuth, (req,res) => image.handleApiCall(req,res))

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`App is running on port ${PORT}`))