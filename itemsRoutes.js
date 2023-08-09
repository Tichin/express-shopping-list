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
  if (!(+price)){
    throw new BadRequestError()
  }

  const newItem = { name, price };

  items.push(newItem);

  return res.json({"added": newItem});
});

/**GET /items/:name: get a certain item
 * ex => {name: "popsicle", "price": 1.45}
*/
router.get("/:name", function (req, res) {

  const name = req.params.name
  for (let item of items){
    if (item.name === name){
      return res.json(item)
    }
  }

  throw new NotFoundError()
});

/**PATCH /items/:name: edit a certain item */
router.patch("/:name", function (req, res) {
  return res.send('edit a certain item');
});

/** DELETE  /items/:name: delete an item, return {message: Deleted} */
router.delete("/:name", function (req, res) {

  return res.json({ message: "Deleted" });
});

module.exports = router;