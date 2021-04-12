const express = require("express");
const Medicine = require("../models/medicine");

const router = new express.Router();
const auth = require("../middleware/auth");
const Category = require("../models/category");

router.get("/get/medicine", async (req, res) => {
  try {
    const medicine = await Medicine.find({
      contributors: { $elemMatch: { name: req.user.name } },
    }).sort({ createdAt: -1 });
    res.json({ medicine });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/get/medicine/:id", async (req, res) => {
  try {
    const medicines = await Medicine.find({ category: req.params.id });
    res.json({ medicines });
  } catch (e) {
    res.status(404).send(e);
  }
});

router.post("/add/medicine", auth, async (req, res) => {
  const medicine = new Medicine({
    ...req.body,
  });

  try {
    await medicine.save();
    res.status(201).json({ medicine });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.put("/update/medicine/:id", auth, async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ medicine });
  } catch (e) {
    res.status(404).send();
  }
});

router.delete("/delete/medicine/:id", auth, async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);
    res.json(medicine);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
