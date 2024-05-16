import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('email',email);
    console.log('pass',password);
    const {user} = await User.findOne({ email });
    console.log('user',user)
    if (user) {
      return res.json({
        message: `${username} уже занят!`,
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({ username, password: hash });
    await newUser.save()
    console.log("salt", salt);

    return res.status(200).json({ message: "Success" });
  } catch (error) {
    return res.status(500).json({ error: "An error occured!" });
  }
};

export const login = async (req, res) => {
  try {
    return res.status(200).json({ message: "Login" });
  } catch (error) {
    return res.status(500).json({ error: "An error occured!" });
  }
};

export const getMe = async (req, res) => {
  try {
    return res.status(200).json({ message: "Me" });
  } catch (error) {
    return res.status(500).json({ error: "An error occured!" });
  }
};
