import blacklistModel from "../../models/blaclistToken.model.js";
import {
  registerNewUser,
  verifyUserEmail,
  authenticateUser
} from "../../services/auth.service.js";


/////////////////////// register ///////////////////////
export const registerUser = async (req, res) => {

  try {
    const { fullname, email, password } = req.body;
    const { token, user } = await registerNewUser({ fullname, email, password }, res);

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: { token, user }
    });

  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to register user."
    });
  }
};


///////////////////////verify mit email ///////////////////////

export const VerfiyEmail = async (req, res) => {
  try {
    const { code } = req.body;
    const result = await verifyUserEmail(code);
    console.log(code);

    res.status(200).json({
      success: true,
      message: result.message
    });

  } catch (error) {
    console.error("Verification error:", error.message);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Email verification failed."
    });
  }
};

///////////////////////login ///////////////////////

export const loginUser = async (req, res) => {


  try {
    const { email, password } = req.body;
    const { token, user } = await authenticateUser(email, password);

    res.status(200).json({
      success: true,
      message: "Login successful.",
      data: {
        token,
        user
      }
    });

  } catch (error) {
    console.error("Login error:", error.message);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Login failed."
    });
  }
};

/////////////////////// PROFILE ///////////////////////

export const getUserProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user
  });
};


//////////////////////////////////////

export const logOut=async(req,res)=>{

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

if (!token) {
  return res.status(400).json({ message: "No token found" });
}

await blacklistModel.create({ token });

res.clearCookie("token", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict"
});

res.status(200).json({
  success: true,
  message: "Successfully logged out!"
});


    
}
