import userModel from "../models/users.model.js";
import { sendVerificationEamil, senWelcomeEmail } from "../middleware/Email.js";
import { generateTokenAndSetCookies } from "../middleware/GenerateToken.js";

////////////////////////////////////////////  Register
// export const registerNewUser = async ({ fullname, email, password }) => {
//   const existingUser = await userModel.findOne({ email });
//   if (existingUser) throw new Error("User with this email already exists");

//   const hashedPassword = await userModel.hashPassword(password);
//   const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

//   const newUser = new userModel({
//     fullname,
//     email,
//     password: hashedPassword,
//     verificationToken,
//     verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
//   });

//   await newUser.save();
//   generateTokenAndSetCookies(res, newUser._id); // If you're not using this response, remove it
//   await sendVerificationEamil(email, verificationToken);

//   return {
//     token: newUser.generateAuthToken(),
//     user: newUser,
//     message: "Successfully registered!",
//   };
// };
export const registerNewUser = async ({ fullname, email, password }, res) => {
  const existingUser = await userModel.findOne({ email });
  if (existingUser) throw new Error("User with this email already exists");

  const hashedPassword = await userModel.hashPassword(password);
  const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

  const newUser = new userModel({
    fullname,
    email,
    password: hashedPassword,
    verificationToken,
    verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  await newUser.save();

  
  generateTokenAndSetCookies(res, newUser._id);

  await sendVerificationEamil(email, verificationToken);

  return {
    token: newUser.generateAuthToken(),
    user: newUser,
    message: "Successfully registered!",
  };
};


///////////////////////////////////////  Email Verification
export const verifyUserEmail = async (code) => {
  const user = await userModel.findOne({
    verificationToken: code,
    verificationTokenExpiresAt: { $gt: Date.now() },
  });

  if (!user) {
    throw { statusCode: 400, message: "Invalid or Expired Code" };
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpiresAt = undefined;
  await user.save();

  await senWelcomeEmail(user.email, user.fullname.firstname);

  return {
    success: true,
    message: "Email Verified Successfully",
  };
};

////////////////////////////////////////  Login
export const authenticateUser = async (email, password) => {
  const user = await userModel.findOne({ email }).select("+password +isVerified");

  if (!user) {
    throw { statusCode: 400, message: "Invalid email or password!" };
  }

  if (!user.isVerified) {
    throw { statusCode: 403, message: "Please verify your email before logging in." };
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw { statusCode: 401, message: "Password not matched!" };
  }

  const token = user.generateAuthToken();
  return {
    token,
    user,
    message: "Successfully logged in!",
  };
};
