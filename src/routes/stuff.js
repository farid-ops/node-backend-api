const express = require('express')
const router = express.Router()
const stuffCtrl = require('../controller/stuff')
const auth = require('../middleware/auth')

router.get('/', auth, stuffCtrl.getAll)

router.post('/', auth,stuffCtrl.createProduct)

router.get('/:id', auth, stuffCtrl.getProductById)

router.put('/:id', auth, stuffCtrl.updateProduct)

router.delete('/:id', auth, stuffCtrl.delete)

module.exports=router