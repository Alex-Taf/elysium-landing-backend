import dotenv from 'dotenv'
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import Mailer from './utils/mail/index.js'

dotenv.config()

const { PORT } = process.env
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello elys!'))

app.post('/mail', async (req, res) => {
    const { message } = req.body
    return res.json({ result: await Mailer.send(message) })
})

app.listen(PORT || 3000, () => {
    console.log(`Server is running on port: ${PORT || 3000}`)
})
