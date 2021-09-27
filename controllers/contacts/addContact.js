const { Contact } = require('../../models')
const { sendSuccessRes } = require('../../helpers')

const addContact = async (req, res) => {
  const result = await Contact.create(req.body)
  sendSuccessRes(res, { data: result }, 201)
}

module.exports = addContact
