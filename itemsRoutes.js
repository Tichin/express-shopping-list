'use strict';
const express = require("express");

const { items } = require("./fakeDb");
const router = new express.Router();

/** GET /items: get list of items */
router.get("/", function (req, res) {
  return res.json({ items });
});

/** POST /items: create an item */
router.get("/", function (req, res) {
  return res.send('create an item');
});

/**GET /items/:name: get a certain item */
router.get("/:name", function (req, res) {
  return res.send('get a certain item');
});

/**PATCH /items/:name: edit a certain item */
router.get("/:name", function (req, res) {
  return res.send('edit a certain item');
});

/** DELETE  /items/:name: delete an item, return {message: Deleted} */
router.delete("/:name", function (req, res) {

  return res.json({ message: "Deleted" });
});

module.exports = router;