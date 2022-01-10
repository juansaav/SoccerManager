import app from "..";
import { agent as request } from "supertest";
import { expect } from "chai";

// Dummy data
const email = "test5@test.com";
const password = "123456";

let userId;
let token;
let playerId;
let transferId;

describe("Test player functionallity", function () {
  // Only runs before the current describe.
  before(async () => {
    // Register user 1
    await request(app)
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
      });
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
  });
  it("Test get player", async function () {
    // Transfer player
    await request(app)
      .get("/player/" + playerId)
      .send()
      .set("Connection", "keep alive")
      .set("Content-Type", "application/json")
      .set("Authorization", "Bearer " + token)
      .then(function (res) {
        expect(res.status).equals(200);
        expect(res.body.id).greaterThan(0);
      });
  });
});
