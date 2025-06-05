import { verifyUserEmail } from "../../services/auth.service.js";

export const verifyEmail = async (req, res) => {
  try {
    const result = await verifyUserEmail(req.body.code);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Verification error:", error.stack);
    return res.status(500).json({ 
      message: "Verification failed", 
      error: error.message 
    });
  }
};
