import mongoose from "mongoose";

const Schema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  carId: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  postingDate: {
    type: String,
    required: false,
  },
  isActive: {
    type: Boolean,
    required: false,
  },
  reasonForDeactivation: {
    type: String,
    required: false,
  },
});

const Ad = mongoose.model("Ad", Schema);
export default Ad;

//66795a5d7e320967dd2330c2 vlad cucu
//667f2cd82804c79a9dc0fbc7 alex voicu
//667f2d2d2804c79a9dc0fbc9 matei morar
//667f2d752804c79a9dc0fbcb ana stanescu

//ads 667f3122ad94891c6affb0b9 mert
//667f31eead94891c6affb0bd mazda
//667f3223ad94891c6affb0bf opel
