const express = require('express');
const authController = require('../controllers/auth.controller')
const auth = require('../middlewares/auth')

const router = express.Router();

router.post('/login', authController.login)
router.post('/logout', auth('admin', 'manage'), authController.logout)

module.exports = router