const express = require('express');
const auth = require('../middlewares/auth')

const userController = require('../controllers/user.controller')

const router = express.Router();

router.get('/', auth('admin'), userController.getAllUser)
router.post('/create', auth('admin'), userController.createUser)
router.get('/:id', auth('admin', 'manage'), userController.getUserById)
router.put('/:id', auth('admin'), userController.updateUserById)
router.delete('/:id', auth('admin'), userController.deleteUserById)

module.exports = router;