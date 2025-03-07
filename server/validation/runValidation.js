

const { validationResult } = require("express-validator");


exports.checkValidation=(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let errorList = errors.array().map(error => error.msg);
        return res.status(400).json({ errors: errorList });
    }
    next();
  }
