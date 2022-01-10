// Separate this file in: movie, session.. Mocha tests order problem

import app from "..";
import { agent as request } from "supertest";
import { expect } from "chai";
import randomEmail from "random-email";

// Dummy data
const email = "test@test.com";
const password = "123456";
var userId;

// Try create user with invalid data
it("POST /user should get validations errors.", async function () {
  const res = await request(app)
    .post("/user")
    .set("Connection", "keep alive")
    .set("Content-Type", "application/json")
    .send({
      email: "invalid email",
      firstName: "",
      lastName: "",
      password: "",
    });
  expect(res.status).equals(400);
  expect(res.body.errors).to.have.lengthOf(2);
});

// Try Login invalid credentials
it("POST /session and get an error.", async function () {
  const res = await request(app)
    .post("/session")
    .set("Connection", "keep alive")
    .set("Content-Type", "application/json")
    .send({ email: email, password: "111" });
  expect(res.status).equals(500);
});

// Register
it("POST /user should get create user.", function (done) {
  request(app)
    .post("/user")
    .set("Connection", "keep alive")
    .set("Content-Type", "application/json")
    .send({
      email: email,
      countryCode: "UY",
      password: password,
    })
    .end(function (err, res) {
      expect(res.status).equals(200);
      userId = res.body.id;
      done();
    });
});
