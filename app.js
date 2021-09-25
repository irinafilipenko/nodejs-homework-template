const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const DB_HOST =
  'mongodb+srv://irina:QevMF0Z5nWD3gmvZ@cluster0.qabp5.mongodb.net/db-contacts?retryWrites=true&w=majority'

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('HI')
  })
  .catch((error) => {
    console.log(error.message)
  })

const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app

//QevMF0Z5nWD3gmvZ irina

//mongodb+srv://irina:QevMF0Z5nWD3gmvZ@cluster0.qabp5.mongodb.net/db-contacts?retryWrites=true&w=majority
