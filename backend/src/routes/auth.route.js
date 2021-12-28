const express = require('express');
const authController = require('../controllers/auth.controller')

const router = express.Router();

router.post('/login', authController.login)
router.post('/logout', authController.authorization, authController.logout)
router.post('/signup')
router.post('/changepass')



module.exports = router