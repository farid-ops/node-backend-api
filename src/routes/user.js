const express = require('express')
const userCtrl = require('../controller/user')
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/', auth, userCtrl.getAllUsers)
router.get('/:id', auth, userCtrl.findOneUser)
router.post('/', userCtrl.saveUser)
router.put('/:id', auth, userCtrl.updateUser)
router.delete('/:id', auth, userCtrl.deleteUser)
router.post('/login', userCtrl.signin)
router.post('/signup', userCtrl.signup)

module.exports=router