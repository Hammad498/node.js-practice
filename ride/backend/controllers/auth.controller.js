import { validationResult } from "express-validator";
import {
  registerNewUser,
  verifyUserEmail,
  authenticateUser,
} from "../services/auth.service.js";






////////////////////////// Register Controller
export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Validation error", errors: errors.array() });
  }

  try {
    //auth.services.js (registernewuser)
    const result = await registerNewUser(req.body,res);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Register error:", error.stack);
    return res.status(500).json({ message: "Registration failed", error: error.message });
  }
};





///////////////////////////////////  Verify Email Controller
export const VerfiyEmail = async (req, res) => {
  try {

    //auth.services.js (verifyUserEmail)
    const result = await verifyUserEmail(req.body.code);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Verification error:", error.stack);
    return res.status(500).json({ message: "Verification failed", error: error.message });
  }
};












/////////////////////////  Login Controller
export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Validation error", errors: errors.array() });
  }

  try {
    //auth.services.js (authenticateUser)
    const result = await authenticateUser(req.body.email, req.body.password);
    return res.status(200).json(result);
  } catch (error) {
    const status = error.statusCode || 500;
    return res.status(status).json({ message: error.message });
  }
};
