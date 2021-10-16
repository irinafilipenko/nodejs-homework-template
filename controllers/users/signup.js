const { User } = require('../../models')
const { v4 } = require('uuid')
const { Conflict } = require('http-errors')
const { sendEmail } = require('../../helpers')

const signup = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Already register')
  }
  const verifyToken = v4()
  const newUser = new User({ email, verifyToken })
  newUser.setPassword(password)
  await newUser.save()

  const data = {
    to: email,
    subject: 'Confirmation of registration',
    html: `<a href="http://localhost:3000/api/users/verify/${verifyToken}" target=_blank">Confirm mail</a>`,
  }

  await sendEmail(data)
  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Success register',
    data: {
      verifyToken,
    },
  })
}

module.exports = signup
