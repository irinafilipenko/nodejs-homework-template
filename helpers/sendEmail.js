const sgMail = require('@sendgrid/mail')
require('dotenv').config()

const { SENDGRID_KEY } = process.env
sgMail.setApiKey(SENDGRID_KEY)

// const email = {
//   to: 'filipenkoirina5532@gmail.com',
//   from: 'abyoo15532@gmail.com',
//   subject: 'Good morning',
//   html: '<p>Хороших выходных!!!</p>',
// }
const sendEmail = async (data) => {
  const email = { ...data, from: 'abyoo15532@gmail.com' }
  await sgMail.send(email)
}
module.exports = sendEmail
