const express = require("express");
const { signup,checkAuth, login } = require("../../controllers/auth");

const router = express.Router();

router.post('/signup',signup)
// router.post('/login',)
router.post('/checkToken',checkAuth)
router.post('/login',login)



module.exports= router