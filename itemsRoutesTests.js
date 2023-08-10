'use strict';

const request = require("supertest");

const app = require("./app");

// import db
let { items } = require("./fakeDb")

let kitKat = {name: "kit-kat", price: 1.99};

beforeEach(function() {
  items.push(kitKat)
})

afterEach(function() {
  // for (let i = 0; i < items.length; i++){
  //   items.splice(i, 1);
  // }
  while (items.length > 0){
    items.pop();
  }
})


/**
 * GET /items - returns ALL shopping list items:
 *
 * ex:
 * { items: [
 * { name: "popsicle", price: 1.45 },
 * { name: "cheerios", price: 3.40 }
 * ]}
 *
 */
describe("GET /items", function() {
  it("returns list of shopping items", async function(){
    const resp = await request(app).get("/items")

  expect(resp.body).toEqual({ items: [{name: "kit-kat", price: 1.99}]})
  });
});


/** Create a new shopping list item from posted JSON body
 * ex => {name: "popsicle", price: 1.45}
 *
 * Returns newly added item as JSON
 * ex => {added: {name: "popsicle", price: 1.45}}
 */
describe("POST /items", function() {
  it("creates new shopping list item", async function(){
    const resp = await request(app)
    .post("/items")
    .send({
      name: "Snickers",
      price: 1.45
    })
  expect(resp.statusCode).toEqual(201);
  expect(resp.body).toEqual({ added: {name: "Snickers", price: 1.45}})
  });
});


describe("GET /items/:name", function() {
  it("returns a single item from shopping list", async function(){
  const resp = await request(app).get("/items/kit-kat")

  expect(resp.statusCode).toEqual(200);
  expect(resp.body).toEqual({name: "kit-kat", "price": 1.99});
  });


  it("responds with 404 if item does not exist ", async function(){
    const resp = await request(app).get("/items/mars")
    expect(resp.statusCode).toEqual(404);
    expect(resp.body).toEqual({
      "error": {
      "message": "Not Found",
      "status": 404
    }});
    });
});




