const express = require("express");
const Category = require("../models/category");

const router = new express.Router();
const auth = require("../middleware/auth");
const { findByIdAndUpdate } = require("../models/category");

router.post("/add/category", auth, async (req, res) => {
  try {
    const category = new Category({ ...req.body, owner: req.query.id });
    await category.save();
    res.status(201).send({ category });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/get/categories", async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(201).send({ categories });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/get/categories/withmeds", async (req, res) => {
  try {
    const category = await Category.find({}).populate("medicine");
    res.json({ category });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/update/category/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).send({ category });
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
