import mongoose from "mongoose";
const Schema = mongoose.Schema;

const carcollectionSchema = new Schema({
  make: {
    type: String,
    required: true,
  },
  models: [String],
});

const Carcollection = mongoose.model("Carcollection", carcollectionSchema);
export default Carcollection;
