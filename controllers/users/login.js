const { BadRequest } = require('http-errors')
// const jwt = require('jsonwebtoken')
const { User } = require('../../models')
// const { SECRET_KEY } = process.env

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }, '_id email password verify')
  if (!user || !user.comparePassword(password)) {
    throw new BadRequest('Invalid email or password')
  }
  console.log(user)
  if (!user.verify) {
    throw new BadRequest('Email not verify!')
  }
  const token = user.createToken()
  await User.findByIdAndUpdate(user._id, { token })
  res.json({
    status: 'success',
    code: 200,
    data: {
      token,
    },
  })
}
module.exports = login
