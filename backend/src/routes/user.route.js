const express = require('express');
const userController = require('../controllers/user.controller')

const router = express.Router();

router.get('/', userController.getAllUser)
router.post('/create', userController.createUser)
// router.get('/:tourId', userController.getUserById)
// router.put('/:tourId', userController.updateUserById)
// router.delete('/:tourId', userController.deleteUserById)

module.exports = router;