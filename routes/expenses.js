var express = require('express');
var router = express.Router();
const { auth } = require('../middleware/auth');
const { validate } = require('express-validation');
const { create, update, getById } = require('../validation/expenses');
const expenses = require('../controller/expenses');

/* GET users listing. */
router.post('/', validate(create),auth, expenses.create);
router.get('/', expenses.getAll);
router.get('/:id', validate(getById),auth, expenses.getById);
router.put('/:id', validate(update),auth, expenses.update);
router.delete('/:id', validate(getById),auth, expenses.destroy);

module.exports = router;