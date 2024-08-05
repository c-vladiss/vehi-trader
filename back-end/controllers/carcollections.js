import Carcollection from "../models/carCollection.js";

const getCarcollections = async (req, res) => {
  try {
    const carcollections = await Carcollection.find();
    res.status(200).send({ carcollections: carcollections });
  } catch (err) {
    res
      .status(500)
      .send("internal server error: cannot get carcollections", err);
  }
};

const putCarcollection = async (req, res) => {
  try {
    const carcollection = new Carcollection(req.body);
    await carcollection.save();
    res.status(201).send(carcollection);
  } catch (err) {
    res
      .status(500)
      .send("internal server error: cannot put carcollection", err);
  }
};

const addCarcollection = async (req, res) => {
  try {
    const carcollection = await Carcollection.findById(req.params.id);
    carcollection.cars.push(req.body);
    await carcollection.save();
    res.status(201).send(carcollection);
  } catch (err) {
    res
      .status(500)
      .send("internal server error: cannot add car to carcollection", err);
  }
};

const deleteCarcollection = async (req, res) => {
  try {
    await Carcollection.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res
      .status(500)
      .send("internal server error: cannot delete carcollection", err);
  }
};

export {
  getCarcollections,
  putCarcollection,
  addCarcollection,
  deleteCarcollection,
};
