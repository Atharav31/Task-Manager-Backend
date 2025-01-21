import jwt from "jsonwebtoken";
import User from "../Models/User.js";

export const setTokenCookie = (res, payload) => {
  console.log(payload);
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    console.log(token);
    res.cookie("token", token, { httpOnly: true });
    return token;
  } catch (error) {
    console.log(error);
  }
};
export const isAuthenticated = async (req, res, next) => {
  console.log(req.cookies);
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized: Token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
