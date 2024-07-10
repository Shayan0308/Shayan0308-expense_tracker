var express = require('express');
var router = express.Router();
const userRoute = require('./users');
const expenseRoute = require('./expenses');
const { auth } = require('../middleware/auth');

/* GET home page. */
router.use('/auth', userRoute);
router.use('/expenses', auth, expenseRoute);

module.exports = router;
