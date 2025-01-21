import bcrypt from "bcrypt";
import { sendEmail } from "../Services/Email.js";
import { signupEmail } from "../Emails/UserEmail.js";
import { setTokenCookie } from "../Middlewares/Cookies.js";
import User from "../Models/User.js";

export const signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    console.log(username, email, password);
    console.log(req.body);
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: "Email is already Exists" });
      } else if (existingUser.username === username) {
        return res.status(400).json({ message: "Username is already taken" });
      }
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = await User({ username, email, password: hash });
    newUser.save();
    sendEmail({ subject: "Signup Confirmation", html: signupEmail, to: email });
    return res
      .status(201)
      .json({ message: "User created successfully", data: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    if (!emailOrUsername || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const payload = {
      id: user._id,
      email: user.email,
      username: user.username,
    };
    const withoutPassword = await User.findById(user._id).select("-password");
    const token = setTokenCookie(res, payload);
    return res
      .status(200)
      .json({ message: "Login successful", data: withoutPassword, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const logout = async (req, res) => {
  try {
    console.log(req.cookies);
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const profile = async (req, res) => {
  try {
    const {} = req.body;
    res.status(200).json({ message: "Profile", data: req.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
