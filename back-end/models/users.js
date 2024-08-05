import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  uploadedCars: [{ type: mongoose.Schema.Types.ObjectId, ref: "Car" }],
  favoriteCars: [{ type: mongoose.Schema.Types.ObjectId, ref: "Car" }],
});

const User = mongoose.model("User", userSchema);
export default User;
