import User from "../models/users.js";
import bcrypt from "bcrypt";

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  try {
    if (user) {
      const userBasicInfo = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        city: user.city,
        username: user.username,
        email: user.email,
        phone: user.phone,
        favoriteCars: user.favoriteCars,
        uploadedCars: user.uploadedCars,
      };
      res.status(200).send(userBasicInfo);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;
  try {
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).send("User not found");
    }
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      updateData
    );
    if (updatedUser) {
      const userBasicInfo = {
        id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        address: updatedUser.address,
        city: updatedUser.city,
        username: updatedUser.username,
        email: updatedUser.email,
        phone: updatedUser.phone,
        favoriteCars: updatedUser.favoriteCars,
        uploadedCars: updatedUser.uploadedCars,
      };
      res.status(200).send(updatedUser);
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send("Error: ", err);
  }
};

const createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      city: req.body.city,
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
      phone: req.body.phone,
      favoriteCars: [],
      uploadedCars: [],
    });

    await user.save();
    res.status(201).send({ user: user });
  } catch (err) {
    res.status(500).send("internal server error ", err);
  }
};

const deleteUser = async (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).send("User deleted");
    })
    .catch((err) => {
      res.status(404).send("User not found");
    });
};

const getFavoriteCars = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      const cars = await Car.find({ _id: { $in: user.favoriteCars } });
      res.status(200).send(cars);
    }
  } catch (err) {
    res.status(500).send("Error: ", err);
  }
};

const getUploadedCars = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      const cars = await Car.find({ _id: { $in: user.uploadedCars } });
      res.status(200).send(cars);
    }
  } catch (err) {
    res.status(500).send("Error: ", err);
  }
};

export {
  getUserById,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getFavoriteCars,
  getUploadedCars,
};
