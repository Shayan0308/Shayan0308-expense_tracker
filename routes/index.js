var express = require('express');
var router = express.Router();
const userRoute = require('./users');
const expenseRoute = require('./expenses');

/* GET home page. */
router.use('/auth',userRoute);
router.use('/expenses',expenseRoute);

module.exports = router;
