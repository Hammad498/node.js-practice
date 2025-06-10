


import jwt from 'jsonwebtoken';
import userModel from '../../backend/models/users.model.js';
import blacklistModel from '../models/blaclistToken.model.js';


export const authUser = async (req, res, next) => {
  try {
    //so user is loged in...purpose is that user check his/her profile not others...here the token will play it's role
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];


    if (!token) {
      return res.status(401).json({
        message: "Token is unauthorized!"
      });
    }

    const isBlacklisted = await blacklistModel.findOne({ token });
if (isBlacklisted) {
  return res.status(401).json({
    success: false,
    message: "Token is blacklisted. Unauthorized!"
  });
}

     //now token is present , decode it to verify that the respective token belongs to that particular user
    const decoded = jwt.verify(token, process.env.SECRET_KEY);


    //after verification in database find that user whoes token is decoded
    const user = await userModel.findById(decoded._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found!" ,data:user});
    }

    
    req.user = user;

    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(500).json({
      message: "Unable to authorize the user!",
      error: error.message,
    });
  }
};
