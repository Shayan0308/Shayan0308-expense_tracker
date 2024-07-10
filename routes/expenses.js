var express = require('express');
var router = express.Router();
const { validate } = require('express-validation');
const { create, update, getById } = require('../validation/expenses');
const expenses = require('../controller/expenses');

/* GET users listing. */
router.post('/', validate(create), expenses.create);
router.get('/', expenses.getAll);
router.get('/:id', validate(getById), expenses.getById);
router.put('/:id', validate(update), expenses.update);
router.delete('/:id', validate(getById), expenses.destroy);

module.exports = router;