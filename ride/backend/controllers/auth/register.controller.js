import { validationResult } from "express-validator";
import { registerNewUser } from "../../services/auth.service.js";

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      message: "Validation error", 
      errors: errors.array() 
    });
  }

  try {
    const result = await registerNewUser(req.body, res);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Register error:", error.stack);
    return res.status(500).json({ 
      message: "Registration failed", 
      error: error.message 
    });
  }
};
