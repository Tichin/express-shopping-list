'use strict';
const express = require("express");

const { items } = require("./fakeDb");
const { NotFoundError, BadRequestError } = require("./expressError");
const router = new express.Router();


/** GET /items, returns list of shopping items
 *  ex => { items: [ {name: "popsicle", price: 1.45 } ...]}
 */
router.get("/", function (req, res) {
  return res.json({ "items": items });
});


/** POST /items: create an item with posted JSON body
 * ex => {name: "popsicle", price: 1.45}
 *
 * Returns {added: {name: "popsicle", price: 1.45}}
*/
router.post("/", function (req, res) {
  const name = req.body.name;
  const price = req.body.price;

  // could potentially seperate into middleware
  if (!(+price)) {
    throw new BadRequestError();
  }

  const newItem = { name, price };

  items.push(newItem);

  return res.json({ "added": newItem });
});

/**GET /items/:name: get a certain item
 * ex => {name: "popsicle", "price": 1.45}
*/
router.get("/:name", function (req, res) {

  const name = req.params.name;
  for (let item of items) {
    if (item.name === name) {
      return res.json(item);
    }
  }

  throw new NotFoundError();
});

/**PATCH /items/:name:  accept JSON body, modify item, return it
 *
 * {name: "new popsicle", price: 2.45} =>
 * {updated: {name: "new popsicle", price: 2.45}}
 *
 */
router.patch("/:name", function (req, res) {

  const name = req.params.name;

  const updatedName = req.body.name;
  const updatedPrice = req.body.price;

  if (!(+updatedPrice)) {
    throw new BadRequestError();
  }

  for (let item of items) {
    if (item.name === name) {
      item.name = updatedName || item.name;
      item.price = +updatedPrice || item.price;
      return res.json({ "updated": item });
    }
  }

  throw new NotFoundError();
});

/** DELETE  /items/:name:
 *
 * accepts valid name of record in db and
 * delete the record , return {message: Deleted}
 *
 * */
router.delete("/:name", function (req, res) {

  const name = req.params.name;

  for (let i = 0; i < items.length; i++) {
    if (items[i].name === name) {
      items.splice(i, 1);
      return res.json({ message: "Deleted" });
    }
  }

  throw new NotFoundError();
});

module.exports = router;