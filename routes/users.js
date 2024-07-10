var express = require('express');
var router = express.Router();
const { validate } = require('express-validation');
const { register, login } = require('../validation/users');
const users = require('../controller/users');

/* GET users listing. */
router.post('/register', validate(register), users.register);
router.post('/login', validate(login), users.login);

module.exports = router;
