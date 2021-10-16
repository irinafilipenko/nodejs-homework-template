const express = require('express')

const { joiSchema } = require('../../models/user')
const {
  controllerWrapper,
  validation,
  authenticate,
  upload,
} = require('../../middelwares')
const { users: ctrl } = require('../../controllers')

const router = express.Router()

router.post('/signup', validation(joiSchema), controllerWrapper(ctrl.signup))

router.post('/login', validation(joiSchema), controllerWrapper(ctrl.login))

router.get('/logout', authenticate, controllerWrapper(ctrl.logout))

router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.avatars)

router.get('/current', authenticate, controllerWrapper(ctrl.current))

router.get('/verify/:verifyToken', controllerWrapper(ctrl.verify))

module.exports = router
