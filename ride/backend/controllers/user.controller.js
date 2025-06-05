import { validationResult } from "express-validator";
import userModel from "../models/users.model.js";
import { createUser } from "../services/user.services.js";
import { generateTokenAndSetCookies } from "../middleware/GenerateToken.js";
import { sendVerificationEamil, senWelcomeEmail } from "../middleware/Email.js";

////register user with name ,email and password , if not exists then first create user then register
export const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation error",
      errors: errors.array(),
    });
  }

  try {
    const { fullname, email, password } = req.body;

    const hashedPassword = await userModel.hashPassword(password);

    ///*
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const user = await createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    await user.save();
    generateTokenAndSetCookies(res, user._id);
    await sendVerificationEamil(user.email, verificationToken);

    console.log("New user:", user);

    //token associated with the user (who is currently logedin or registed---whenever a new user created a token of that user also created along with that user)
    const token = user.generateAuthToken();

    res.status(200).json({ token, user, message: "Successfully registered!" });
  } catch (error) {
    console.error("Register error:", error.message, error.stack);
    res.status(500).json({
      message: "Unable to register the user!",
      error: error.message,
    });
  }
};
/////////////////////////////////////////////////////

export const VerfiyEmail = async (req, res) => {
  try {
    const { code } = req.body;
    const user = await userModel.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Inavlid or Expired Code" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();
    console.log("User verified:", user);

    await senWelcomeEmail(user.email, user.fullname.firstname);

    return res
      .status(200)
      .json({ success: true, message: "Email Verifed Successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "internal server error" });
  }
};
/////////////////////////////////////////////////////

export const loginUser = async (req, res) => {
    
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({
      message: "Validation error: loginUser",
      errors: validationErrors.array(),
    });
  }

  try {
    const { email, password } = req.body;

    const user = await userModel
      .findOne({ email })
      .select("+password +isVerified");
    console.log("User from DB:", user);

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password!",
      });
    }
    console.log("isVerified status:", user.isVerified);

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email before logging in.",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Password not matched!",
      });
    }

    const token = user.generateAuthToken();

    return res.status(200).json({
      token,
      user,
      message: "Successfully logged in!",
    });
  } catch (err) {
    console.log("Login error:", err);
    return res.status(500).json({
      message: "Failed to log in the user",
      error: err.message,
    });
  }
};
