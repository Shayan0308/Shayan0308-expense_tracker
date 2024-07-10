const { expenses } = require("../models");
const createError = require('http-errors');

exports.create = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const expense = await expenses.create(payload);

    return res.status(200).json({ message: "Expense created Successfully !!", expense });
  } catch (error) {
    next(error);
  }
}

exports.getAll = async (req, res, next) => {
  try {
    const user_id = req.id;
    const getAllExpenses = await expenses.findAll({
      where: {
        user_id,
        isDelete: false
      }
    });
    return res.status(200).json({ message: "Expenses Fetched Successfully !!", getAllExpenses });
  } catch (error) {
    next(error);
  }
}

exports.getById = async (req, res, next) => {
  try {
    const user_id = req.id;
    const expense_id = req.params.id;
    const getExpense = await expenses.find({
      where: {
        id: expense_id,
        user_id,
        isDelete: false
      },
      attributes: ["user_id", "amount", "description", "date"]
    });
    if (!getExpense) throw createError(404, 'Expense Not Found');
    return res.status(200).json({ message: "Expense Fetched Successfully !!", getExpense });
  } catch (error) {
    next(error);
  }
}

exports.update = async (req, res, next) => {
  try {
    const user_id = req.id;
    const expense_id = req.params.id;
    const { body: payload } = req;
    const getExpense = await expenses.find({
      where: {
        id: expense_id,
        user_id,
        isDelete: false
      },
    });
    if (!getExpense) throw createError(404, 'Expense Not Found');
    await getExpense.update(payload);
    return res.status(200).json({ message: "Expense Updated Successfully !!", getExpense });
  } catch (error) {
    next(error);
  }
}

exports.destroy = async (req, res, next) => {
  try {
    const user_id = req.id;
    const expense_id = req.params.id;
    const getExpense = await expenses.count({
      where: {
        id: expense_id,
        user_id,
        isDelete: false
      },
    });
    if (!getExpense) throw createError(404, 'Expense Not Found');
    await getExpense.update({ isDelete: true });
    return res.status(200).json({ message: "Expense Updated Successfully !!", getExpense });
  } catch (error) {
    next(error);
  }
}