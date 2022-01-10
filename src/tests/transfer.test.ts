import app from "..";
import { agent as request } from "supertest";
import { expect } from "chai";

// Dummy data
const email = "test3@test.com";
const password = "123456";

const email1 = "test4@test.com";
const password1 = "123456";

let userId;
let token;
let playerId;
let transferId;

describe("Test transfer functionallity", function () {
  // Only runs before the current describe.
  before(async () => {
    // Register user 1
    await Promise.all([
      request(app)
        .post("/user")
        .set("Connection", "keep alive")
        .set("Content-Type", "application/json")
        .send({
          email: email,
          countryCode: "UY",
          password: password,
        })
        .then(function (res) {
          expect(res.status).equals(200);
          expect(res.body).to.have.property("team");
          expect(res.body.team).to.have.property("players");
          expect(res.body.team.players).to.have.lengthOf(20);
          playerId = res.body.team.players[0].id;
          userId = res.body.id;
        }),

      // Register user 2
      request(app)
        .post("/user")
        .set("Connection", "keep alive")
        .set("Content-Type", "application/json")
        .send({
          email: email1,
          countryCode: "UY",
          password: password1,
        })
        .then(function (res) {
          expect(res.status).equals(200);
        }),
    ]);
  });
  it("Transfer player user 1", async function () {
    // Authenticate
    await request(app)
      .post("/session")
      .send({ email: email, password: password })
      .set("Connection", "keep alive")
      .set("Content-Type", "application/json")
      .then(function (res) {
        expect(res.status).equals(200);
        expect(res.body).to.have.property("token");
        token = res.body.token;
      });
    // Transfer player
    await request(app)
      .post("/transfer/")
      .send({
        playerId,
        price: 150000,
      })
      .set("Connection", "keep alive")
      .set("Content-Type", "application/json")
      .set("Authorization", "Bearer " + token)
      .then(function (res) {
        expect(res.status).equals(200);
        transferId = res.body.id;
      });
  });
  it("Get transfer list", async function () {
    // Get transfer list
    await request(app)
      .get("/transfer")
      .set("Connection", "keep alive")
      .set("Content-Type", "application/json")
      .set("Authorization", "Bearer " + token)
      .then(function (res) {
        expect(res.status).equals(200);
        expect(res.body.length).greaterThan(0);
      });
  });
  it("Buy player user 2", async function () {
    // Authenticate
    await request(app)
      .post("/session")
      .send({ email: email1, password: password1 })
      .set("Connection", "keep alive")
      .set("Content-Type", "application/json")
      .then(function (res) {
        expect(res.status).equals(200);
        expect(res.body).to.have.property("token");
        token = res.body.token;
      });
    // Buy player
    await request(app)
      .put("/transfer/" + transferId)
      .send({
        playerId,
        price: 150000,
      })
      .set("Connection", "keep alive")
      .set("Content-Type", "application/json")
      .set("Authorization", "Bearer " + token)
      .then(function (res) {
        expect(res.status).equals(200);
        expect(res.body.active).equals(false);
      });
  });
});
