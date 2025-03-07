const { check } = require("express-validator");

exports.registerValidation=[
    check("name")
        .trim()
        .notEmpty().withMessage("Name is required")
        .isLength({ min: 5 }).withMessage("Name must be at least 5 characters")
        .isLength({ max: 20 }).withMessage("Name must not exceed 20 characters")
        .matches(/^[A-Z]/).withMessage("Name must start with a capital letter")
        .matches(/^[A-Za-z\s]+$/).withMessage("Name can only contain letters and spaces"),

    check("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email format")
        .normalizeEmail(), // Normalizes email to lowercase

    check("password")
        .trim()
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
        .matches(/\d/).withMessage("Password must contain at least one digit")
        .matches(/[@$!%*?&]/).withMessage("Password must contain at least one special character (@$!%*?&)")

];


exports.loginValidation=[
    check("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email format")
        .normalizeEmail(), // Normalizes email to lowercase

    check("password")
        .trim()
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
        .matches(/\d/).withMessage("Password must contain at least one digit")
        .matches(/[@$!%*?&]/).withMessage("Password must contain at least one special character (@$!%*?&)")
]