const supabase = require('../utils/supabase');
const jwt = require('jsonwebtoken')
const { users } = require("../models");
const createError = require('http-errors');

exports.auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) throw createError(401, "Unauthorized");

        const decodedToken = jwt.decode(token);
        const isEmailExisted = await users.findOne({ where: { email: decodedToken.email, isDelete: false }, attributes: ['id'] });
        req.user_id = isEmailExisted.id;
        next();
    } catch (error) {
        next(error);
    }
}
