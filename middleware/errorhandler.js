const { ValidationError } = require("express-validation");

const getErrorMessage = (err) => {
  for (let entity of ["query", "body", "params"]) {
    if (err.details[entity]) {
      return err.details[entity][0].message;
    }
  }
};

exports.errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  if (err instanceof ValidationError) {
    let errorMessage = getErrorMessage(err);
    const status = err.statusCode;
    const errName = err.name;
    return res.status(err.statusCode).json({ status: errName || "error", error: { status, errorMessage, } });
  }
  return res.status(status).json({ status, error: { status, errorMessage, } });
};
