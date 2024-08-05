import Ad from "../models/ads.js";

const getAds = async (req, res) => {
  try {
    const ads = await Ad.find();
    res.status(200).send(ads);
  } catch (err) {
    res.status(500).send("Error: ", err);
  }
};

const getAdsById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    res.status(200).send(ad);
  } catch {
    res.status(404).send("Ad not found");
  }
};

const createAd = async (req, res) => {
  const ad = new Ad(req.body.adData);
  console.log(req.body);
  ad.save()
    .then(() => {
      res.status(201).send({ ad: ad });
    })
    .catch((err) => {
      //send the error message
      res.status(400).send({ erorr: err });
    });
};

const deleteAds = async (req, res) => {
  Ad.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).send({ message: "Ad deleted" });
    })
    .catch((err) => {
      res.status(404).send({ message: "Ad not found" });
    });
};

export { getAds, getAdsById, createAd, deleteAds };
