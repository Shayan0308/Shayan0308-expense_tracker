const { users } = require("../models");
const createError = require('http-errors');
const supabase = require('../utils/supabase');

exports.register = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const isEmailExisted = await users.findOne({ where: { email: payload.email, isDelete: false } });
    if (isEmailExisted) throw createError(409, 'Email address already in Use');

    const userDetail = await users.create(payload);
    const { data, error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
    });
    if (error) throw createError(error.message);
    console.log(data);
    return res.status(200).json({ message: "User Registered Successfully !!" });
  } catch (error) {
    console.log("reg ====> ",error);
    next(error);
  }
}

exports.login = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const isEmailExisted = await users.findOne({ where: { email: payload.email, isDelete: false } });
    if (!isEmailExisted) throw createError(404, 'User Not Found');

    const {data, error} = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    })
    if (error) throw createError(error.message);

    return res.status(200).json({ message: "User Registered Successfully !!", Data: data });
  } catch (error) {
    next(error);
  }
}
