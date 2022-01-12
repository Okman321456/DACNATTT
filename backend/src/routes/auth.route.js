const express = require('express');
const authController = require('../controllers/auth.controller')
const auth = require('../middlewares/auth');
const checkChangePass = require('../middlewares/checkChangePass');

const router = express.Router();

router.post('/login', authController.login)
router.post('/logout', auth('admin', 'manage'), authController.logout)
router.post('/changepass', auth('admin'), checkChangePass, authController.changePass)

module.exports = router