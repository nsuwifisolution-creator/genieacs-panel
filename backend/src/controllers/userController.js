import User from "../models/User.js";

export const listUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      role: role || "viewer"
    });

    const safeUser = user.toObject();
    delete safeUser.password;

    res.status(201).json(safeUser);
  } catch (error) {
    next(error);
  }
};
