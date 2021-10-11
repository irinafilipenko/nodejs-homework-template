const express = require('express')
const logger = require('morgan')
const cors = require('cors')
// const multer = require('multer')
// const path = require('path')
// const { v4 } = require('uuid')
// const fs = require('fs/promises')
require('dotenv').config()

// const tempDir = path.join(__dirname, 'temp')
// const uploadDir = path.join(__dirname, 'public')
// console.log(uploadDir)

// const uploadConfig = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, tempDir)
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname)
//   },
//   limits: {
//     fileSize: 2048,
//   },
// })

// const uploadMiddleware = multer({
//   storage: uploadConfig,
// })

const authRouter = require('./routes/api/users')
const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

// const avatars = []

// app.post('/api/avatars', uploadMiddleware.single('image'), async (req, res) => {
//   const { originalname, path: tempName } = req.file
//   const fileName = path.join(uploadDir, 'avatars', originalname)
//   try {
//     await fs.rename(tempName, fileName)
//     const image = path.join('/avatars', originalname)
//     const newAvatars = { ...req.body, id: v4(), image }
//     avatars.push(newAvatars)
//     res.status(201).json({
//       status: 'success',
//       code: 201,
//       data: {
//         result: newAvatars,
//       },
//     })
//   } catch (error) {
//     await fs.unlink(tempName)
//   }
// })

// app.get('/api/avatars', async (req, res) => {
//   res.json(avatars)
// })

app.use('/api/users', authRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Not Found',
  })
})

app.use((error, req, res, next) => {
  const { status = 500, message = 'Server error' } = error
  res.status(status).json({
    status: 'error',
    code: status,
    message,
  })
})
module.exports = app
