import mongoose, { version } from "mongoose";
const Schema = mongoose.Schema;

const carSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    required: false,
  },
  AdId: {
    type: String,
    required: false,
  },
  VIN: {
    type: String,
    required: false,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  bodyType: {
    type: String,
    required: true,
  },
  generation: {
    type: String,
    required: false,
  },
  version: {
    type: String,
    required: false,
  },
  year: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  fuelType: {
    type: String,
    required: true,
  },
  kilometers: {
    type: Number,
    required: true,
  },
  transmission: {
    type: String,
    required: true,
  },
  gearbox: {
    type: String,
    required: true,
  },
  horsePower: {
    type: Number,
    required: true,
  },
  engineSize: {
    type: Number,
    required: true,
  },
  emissionStandard: {
    type: String,
    required: false,
  },
  color: {
    type: String,
    required: false,
  },
  score: {
    type: Number,
    required: true,
  },
  options: {
    heatedSteats: Boolean,
    airConditioning: Boolean,
    electricWindows: Boolean,
    electricMirrors: Boolean,
    electricSeats: Boolean,
    navigation: Boolean,
    parkingSensors: Boolean,
    rearCamera: Boolean,
    cruiseControl: Boolean,
    leatherSeats: Boolean,
    sunroof: Boolean,
    abs: Boolean,
    esp: Boolean,
    laneAssist: Boolean,
    blindSpot: Boolean,
    xenonLights: Boolean,
    ledLights: Boolean,
  },
  photos: {
    type: [String],
    required: true,
  },
});

const Car = mongoose.model("Car", carSchema);
export default Car;

//66795a5d7e320967dd2330c2 vlad cucu
//667f2cd82804c79a9dc0fbc7 alex voicu
//667f2d2d2804c79a9dc0fbc9 matei morar
//667f2d752804c79a9dc0fbcb ana stanescu

//ads 667f3122ad94891c6affb0b9 mert
//667f31eead94891c6affb0bd mazda
//667f3223ad94891c6affb0bf opel
