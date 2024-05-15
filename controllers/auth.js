import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      return res.json({
        message: `${user} уже занят!`,
      });
    }
    
    console.log("user", username);

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
