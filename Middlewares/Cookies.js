import jwt from "jsonwebtoken";
import User from "../Models/User.js";

export const setTokenCookie = (res, payload) => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Strict",
    });
    console.log("Token set in cookie:", token); // Log token for debugging
    return token;
  } catch (error) {
    console.log("Error setting token in cookie:", error);
  }
};

export const isAuthenticated = async (req, res, next) => {
  console.log("Request received for authentication:", req.cookies); // Log the cookies in the request
  try {
    const token = req.cookies.token;
    if (!token) {
      console.log("No token provided in request."); // Log if no token is provided
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); // Log the decoded token for debugging

    const user = await User.findById(decoded.id);
    if (!user) {
      console.log("User not found for decoded ID:", decoded.id); // Log if user is not found
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.log("Token expired error:", error); // Log token expired error
      return res.status(401).json({ message: "Unauthorized: Token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      console.log("Invalid token error:", error); // Log invalid token error
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    console.error("Internal server error:", error); // Log any other errors
    res.status(500).json({ message: "Internal server error" });
  }
};
