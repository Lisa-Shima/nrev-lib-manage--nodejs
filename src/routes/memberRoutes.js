const express = require('express')
const router = express.Router()
const controllers = require('../controllers/memberController')

router.get('/', controllers.getAllMembers)
router.get('/:id', controllers.getMemberById)
router.post('/', controllers.createMember)
router.put('/:id', controllers.updateMember)
router.delete('/:id', controllers.deleteMember)

module.exports = router