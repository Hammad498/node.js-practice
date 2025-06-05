import { validationResult } from "express-validator";
import { authenticateUser } from "../../services/auth.service.js";

export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      message: "Validation error", 
      errors: errors.array() 
    });
  }

  try {
    const result = await authenticateUser(req.body.email, req.body.password);
    return res.status(200).json(result);
  } catch (error) {
    const status = error.statusCode || 500;
    return res.status(status).json({ message: error.message });
  }
};
