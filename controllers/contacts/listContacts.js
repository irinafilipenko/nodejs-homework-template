const { Contact } = require('../../models')
const { sendSuccessRes } = require('../../helpers')

const listContacts = async (req, res) => {
  const result = await Contact.find({}, '_id name email phone favorite ')
  sendSuccessRes(res, { data: result })
}

module.exports = listContacts
