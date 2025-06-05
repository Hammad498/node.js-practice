
import { validationResult } from "express-validator";

export const handleValidationResult = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
};
